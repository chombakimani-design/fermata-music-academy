"use client";

import { useTransition } from "react";
import { completeLesson } from "@/app/student/lessons/actions/completeLesson";
import { useRouter } from "next/navigation";

export default function CompleteLessonButton({

    lessonId

}:{
    lessonId:number;
}){

    const [pending,startTransition]=useTransition();

    const router=useRouter();


    function handleComplete(){

        startTransition(async()=>{

            await completeLesson(lessonId);

            router.refresh();

        });

    }


    return(

        <button

            onClick={handleComplete}

            disabled={pending}

            className="rounded-xl bg-brand-primary px-8 py-3 font-bold text-white hover:bg-brand-dark disabled:opacity-50"

        >

            {pending

                ?"Completing..."

                :"Mark Lesson Complete"

            }

        </button>

    );

}
