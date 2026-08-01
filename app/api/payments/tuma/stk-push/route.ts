import { NextRequest, NextResponse } from "next/server";
import { getTumaToken } from "@/lib/tuma/auth";

const BASE_URL = process.env.TUMA_BASE_URL!;


export async function POST(req: NextRequest) {

    try {

        const {
            amount,
            phone,
            description,
            callbackUrl,
            paymentId
        } = await req.json();


        if(!paymentId){
            return NextResponse.json(
                {
                    success:false,
                    message:"Payment ID missing"
                },
                {
                    status:400
                }
            );
        }


        const token = await getTumaToken();


        console.log(
            "TUMA TOKEN START:",
            token.substring(0,20)
        );


        const response = await fetch(
            `${BASE_URL}/payment/stk-push`,
            {
                method:"POST",

                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    amount,

                    phone,

                    description,

                    callback_url:
                        callbackUrl ??
                        `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/tuma/callback`

                })
            }
        );


        const text = await response.text();


        console.log(
            "TUMA STATUS:",
            response.status
        );


        console.log(
            "TUMA RESPONSE:",
            text
        );


        const tumaResponse =
            JSON.parse(text);



        if(
            !response.ok ||
            !tumaResponse.success
        ){

            return NextResponse.json(
                {
                    success:false,
                    message:
                        "Tuma request failed",
                    response:tumaResponse
                },
                {
                    status:500
                }
            );

        }



        return NextResponse.json({

            success:true,

            data:
                tumaResponse.data

        });



    } catch(error){

        console.error(
            "STK PUSH ERROR:",
            error
        );


        return NextResponse.json(
            {
                success:false,
                message:
                    "Unable to initiate payment"
            },
            {
                status:500
            }
        );

    }

}
