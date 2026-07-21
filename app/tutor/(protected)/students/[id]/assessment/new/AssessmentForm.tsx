"use client";

import { createAssessment } from "./actions/createAssessment";

export default function NewAssessmentForm({
    studentId,
    courses,
    nextAssessment,
    externalReady,
}: {
    studentId: string;
    courses: any[];
    nextAssessment: number;
    externalReady: boolean;
}) {

    return (

        <form
            action={async (formData) => {
                await createAssessment(studentId, formData);
            }}
            className="space-y-6"
        >

            <div className="rounded-xl border border-brand-primary/20 bg-white p-6 shadow-sm">


                <h2 className="mb-5 text-xl font-bold text-brand-primary">
                    Assessment Details
                </h2>


                <div className="mb-5 rounded-lg bg-brand-primary/5 p-4">

                    <p className="font-semibold text-brand-primary">
                        Next Assessment:
                    </p>

                    <p className="text-slate-700">

                        {externalReady
                            ? "External Assessment"
                            : `Internal ${nextAssessment}`}

                    </p>

                </div>



                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">



                    <div>
                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Assessment Number
                        </label>


                        <select
                            name="assessment_number"
                            defaultValue={
                                externalReady
                                    ? "7"
                                    : String(nextAssessment)
                            }
                            className="w-full rounded-lg border border-brand-primary/20 p-3"
                        >

                            {!externalReady && (
                                <option value={nextAssessment}>
                                    Internal {nextAssessment}
                                </option>
                            )}

                            {externalReady && (
                                <option value="7">
                                    External
                                </option>
                            )}

                        </select>

                    </div>




                    <div>
                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Assessment Type
                        </label>


                        <select
                            name="assessment_type"
                            defaultValue={
                                externalReady
                                    ? "External"
                                    : "Internal"
                            }
                            className="w-full rounded-lg border border-brand-primary/20 p-3"
                        >

                            <option value="Internal">
                                Internal
                            </option>

                            <option value="External">
                                External
                            </option>

                        </select>

                    </div>




                    <div>
                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Course
                        </label>


                        <select
                            name="course_id"
                            className="w-full rounded-lg border border-brand-primary/20 p-3"
                        >

                            {courses.map((item) => (

                                <option
                                    key={item.course_id}
                                    value={item.course_id}
                                >
                                    {item.courses.course_name}
                                </option>

                            ))}

                        </select>

                    </div>




                    <div>
                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Assessment Date
                        </label>


                        <input
                            name="assessment_date"
                            type="date"
                            className="w-full rounded-lg border border-brand-primary/20 p-3"
                        />

                    </div>




                    <div>
                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Subject
                        </label>


                        <input
                            name="subject"
                            className="w-full rounded-lg border border-brand-primary/20 p-3"
                            placeholder="Subject assessed"
                            required
                        />

                    </div>




                    <div>
                        <label className="mb-1 block text-sm font-semibold text-brand-dark">
                            Score
                        </label>


                        <input
                            name="score"
                            type="number"
                            className="w-full rounded-lg border border-brand-primary/20 p-3"
                            placeholder="Optional"
                        />

                    </div>


                </div>




                <div className="mt-5">

                    <label className="mb-1 block text-sm font-semibold text-brand-dark">
                        Remarks
                    </label>


                    <textarea
                        name="remarks"
                        rows={3}
                        className="w-full rounded-lg border border-brand-primary/20 p-3"
                        placeholder="Tutor remarks..."
                    />

                </div>




                <div className="mt-6 flex justify-end">


                    <button
                        type="submit"
                        className="rounded-lg bg-brand-gold px-6 py-3 font-semibold text-brand-dark shadow"
                    >
                        Save Assessment
                    </button>


                </div>


            </div>


        </form>

    );
}
