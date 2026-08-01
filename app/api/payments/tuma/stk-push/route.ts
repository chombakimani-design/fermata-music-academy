import { NextRequest, NextResponse } from "next/server";
import { getTumaToken } from "@/lib/tuma/auth";

const BASE_URL = process.env.TUMA_BASE_URL!;

export async function POST(req: NextRequest) {
    try {
        const { amount, phone, description, callbackUrl } = await req.json();

        const token = await getTumaToken();

        console.log("TUMA TOKEN START:", token.substring(0, 20));

        const response = await fetch(`${BASE_URL}/payment/stk-push`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount,
                phone,
                description,
                callback_url: callbackUrl,
            }),
        });

        const text = await response.text();

        console.log("TUMA STATUS:", response.status);
        console.log("TUMA RESPONSE:", text);

        return NextResponse.json(
            {
                status: response.status,
                response: text,
            },
            {
                status: response.status,
            }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to initiate payment.",
            },
            {
                status: 500,
            }
        );
    }
}
