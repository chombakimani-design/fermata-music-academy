import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendReceiptEmail } from "@/lib/email/send-receipt";

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

        const { error: updateError } =
            await supabase
                .from("payments")
                .update({
                    payment_status: "Completed",
                    transaction_reference:
                        payload.mpesa_receipt_number,
                    mpesa_receipt_number:
                        payload.mpesa_receipt_number,
                    paid_at:
                        payload.timestamp,
                    gateway_response:
                        payload,
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

        const {
            data: receipt,
            error: receiptError,
        } =
            await supabase
                .from("receipts")
                .insert({
                    payment_id: payment.id,
                    receipt_number: receiptNumber,
                    amount_received:
                        payload.amount,
                    total_paid:
                        payload.amount,
                    balance: 0,
                    payment_state: "Paid",
                })
                .select()
                .single();

        if (receiptError) {
            throw new Error(receiptError.message);
        }


        const { data: profile } =
            await supabase
                .from("profiles")
                .select(`
                    first_name,
                    last_name,
                    auth_email
                `)
                .eq(
                    "id",
                    payment.student_id
                )
                .single();


        const { data: course } =
            await supabase
                .from("courses")
                .select("course_name")
                .eq(
                    "id",
                    payment.course_id
                )
                .single();


        if (profile?.auth_email) {

            await sendReceiptEmail({
                to:
                    profile.auth_email,

                studentName:
                    `${profile.first_name} ${profile.last_name}`,

                receiptNumber,

                amount:
                    payload.amount,

                course:
                    course?.course_name ??
                    "Course Payment",

                receiptUrl:
                    `${process.env.NEXT_PUBLIC_APP_URL}/student/receipts/${receipt.id}`,
            });

            console.log(
                "Receipt email sent:",
                profile.auth_email
            );
        }


        return NextResponse.json({
            success: true,
            message:
                "Payment completed, receipt created and email sent.",
        });

    } catch (error) {

        console.error(
            "Tuma callback error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Callback processing failed.",
            },
            {
                status: 500,
            }
        );
    }
}
