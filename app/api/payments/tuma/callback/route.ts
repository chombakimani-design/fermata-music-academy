import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        console.log("========== TUMA CALLBACK ==========");
        console.log(JSON.stringify(payload, null, 2));
        console.log("===================================");

        if (
            payload.status !== "completed" ||
            payload.result_code !== 0
        ) {
            return NextResponse.json({
                success: true,
                message: "Payment not completed.",
            });
        }

        const supabase = await createClient();

        const {
            data: payment,
            error: paymentError,
        } = await supabase
            .from("payments")
            .select("*")
            .eq(
                "checkout_request_id",
                payload.checkout_request_id
            )
            .single();

        if (paymentError || !payment) {
            throw new Error(
                "Payment record not found."
            );
        }

        const { error: updateError } = await supabase
            .from("payments")
            .update({
                payment_status: "Completed",
                transaction_reference:
                    payload.mpesa_receipt_number,
                mpesa_receipt_number:
                    payload.mpesa_receipt_number,
                paid_at: payload.timestamp,
                gateway_response: payload,
            })
            .eq(
                "id",
                payment.id
            );

        if (updateError) {
            throw new Error(updateError.message);
        }

        const receiptNumber =
            `FMA-REC-${Date.now()}`;

        const { error: receiptError } =
            await supabase
                .from("receipts")
                .insert({
                    payment_id: payment.id,
                    receipt_number: receiptNumber,
                    amount_received: payload.amount,
                    total_paid: payload.amount,
                    balance: 0,
                    payment_state: "Paid",
                });

        if (receiptError) {
            throw new Error(receiptError.message);
        }

        return NextResponse.json({
            success: true,
            message: "Payment completed and receipt created.",
        });

    } catch (error) {
        console.error(
            "Tuma callback error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Callback processing failed.",
            },
            {
                status: 500,
            }
        );
    }
}
