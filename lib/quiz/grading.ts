export type QuizQuestion={

    id:number;

    correct_answer:string;

    marks:number;

};

export type StudentAnswer={

    question_id:number;

    selected_answer:string;

};

export function gradeQuiz(

    questions:QuizQuestion[],

    answers:StudentAnswer[],

    passMark:number

){

    let score=0;

    let totalMarks=0;

    const results=[];

    for(const question of questions){

        totalMarks+=question.marks;

        const answer=answers.find(

            a=>a.question_id===question.id

        );

        const correct=

            answer?.selected_answer===question.correct_answer;

        const marksAwarded=

            correct

            ? question.marks

            : 0;

        score+=marksAwarded;

        results.push({

            question_id:question.id,

            selected_answer:

                answer?.selected_answer ?? "",

            is_correct:correct,

            marks_awarded:marksAwarded

        });

    }

    const percentage=

        totalMarks===0

        ? 0

        : Number(

            (

                score/

                totalMarks*

                100

            ).toFixed(2)

        );

    return{

        score,

        totalMarks,

        percentage,

        passed:percentage>=passMark,

        results

    };

}
