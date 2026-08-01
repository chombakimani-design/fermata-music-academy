import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        console.log("========== TUMA CALLBACK ==========");
        console.log(JSON.stringify(payload, null, 2));
        console.log("===================================");

        return NextResponse.json({
            success: true,
            message: "Callback received.",
        });
    } catch (error) {
        console.error("Tuma callback error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Invalid callback payload.",
            },
            {
                status: 400,
            }
        );
    }
}
