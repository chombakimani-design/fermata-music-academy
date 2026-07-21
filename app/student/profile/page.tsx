import Logo from "@/components/branding/Logo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default async function ProfilePage() {


    const supabase = await createClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();



    if(!user){

        redirect("/auth/login");

    }



    const { data: profile } = await supabase
        .from("profiles")
        .select(
            "first_name,last_name,gender,age,occupation,location"
        )
        .eq(
            "id",
            user.id
        )
        .single();




    async function updateProfile(formData:FormData){

        "use server";

        if (!user) {
            redirect("/auth/login");
        }


        const supabase = await createClient();


        await supabase
            .from("profiles")
            .update({

                gender: formData.get("gender"),
                age: Number(formData.get("age")),
                occupation: formData.get("occupation"),
                location: formData.get("location")

            })
            .eq(
                "id",
                user.id
            );


        redirect("/student");

    }




    return (

        <main className="min-h-screen bg-brand-light flex items-center justify-center p-6">


            <div className="w-full max-w-xl rounded-2xl border border-brand-gold bg-white p-10 shadow-xl">



                <div className="flex justify-center">

                    <Logo
                        width={180}
                        height={80}
                    />

                </div>



                <div className="mt-5 h-px w-full bg-brand-gold"/>



                <h1 className="mt-8 text-4xl font-bold text-brand-dark">

                    Complete Your Profile

                </h1>



                <p className="mt-4 text-slate-600">

                    Welcome {profile?.first_name}.
                    Complete your student information before choosing courses.

                </p>




                <form
                    action={updateProfile}
                    className="mt-8 space-y-5"
                >



                    <select
                        name="gender"
                        defaultValue={profile?.gender ?? ""}
                        className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                    </select>




                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        defaultValue={profile?.age ?? ""}
                        className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />




                    <input
                        name="occupation"
                        placeholder="Occupation"
                        defaultValue={profile?.occupation ?? ""}
                        className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />




                    <input
                        name="location"
                        placeholder="Residence / Location"
                        defaultValue={profile?.location ?? ""}
                        className="w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />




                    <button

                        className="w-full rounded-xl bg-brand-primary p-4 font-bold text-white shadow hover:bg-brand-dark"

                    >

                        Save Profile

                    </button>



                </form>



            </div>


        </main>

    );

}

