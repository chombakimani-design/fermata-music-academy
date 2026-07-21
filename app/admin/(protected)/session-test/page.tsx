import { createClient } from "@/lib/supabase/server";

export default async function SessionTest() {

    const supabase = await createClient();

    const {
        data,
        error
    } = await supabase.auth.getUser();

    return (
        <pre>
            {JSON.stringify(
                {
                    user: data.user,
                    error
                },
                null,
                2
            )}
        </pre>
    );

}
