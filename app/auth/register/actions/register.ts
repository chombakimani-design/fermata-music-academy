"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";


async function createInternalEmail(
    supabase: any,
    fullName: string
) {

    const firstName = fullName
        .toLowerCase()
        .trim()
        .split(/\s+/)[0];


    let email = `${firstName}@fermatamusic.academy`;

    let counter = 2;


    while (true) {

        const { data } = await supabase
            .from("profiles")
            .select("id")
            .eq("auth_email", email)
            .maybeSingle();


        if (!data) {

            return email;

        }


        email = `${firstName}${counter}@fermatamusic.academy`;

        counter++;

    }

}



export async function register(formData: FormData) {


    const supabase = await createClient();



    const fullName = String(
        formData.get("full_name") ?? ""
    ).trim();



    const phone = String(
        formData.get("phone") ?? ""
    ).trim();



    const password = String(
        formData.get("password") ?? ""
    );



    if (!fullName || !password) {

        throw new Error(
            "Missing registration details"
        );

    }



    const names = fullName.split(/\s+/);



    const firstName = names[0];


    const lastName =
        names.length > 1
            ? names[names.length - 1]
            : "";



    const email = await createInternalEmail(
        supabase,
        fullName
    );



    const { error } = await supabase.auth.signUp({

        email,

        password,


        options: {

            data: {

                first_name: firstName,

                last_name: lastName,

                phone

            }

        }

    });



    if (error) {

        throw new Error(
            error.message
        );

    }



    redirect("/welcome");

}
