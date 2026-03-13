import { calculateFinal } from "../../utils/calculateFinal";
import { calculatePhysicalResult } from "../../utils/calculatePhysicalTest";
import { calculateTheoryResult } from "../../utils/calculateTheoryResult";
import { Input } from "../ui/Input";

import { InputRadio } from "../ui/InputRadio";



export const DrivingTestResultForm = ({ methods }) => {

    const { register, watch, setValue, formState: { errors } } = methods;

    const physicalTest = watch("physicalTest") || {};
    const theoryTest = watch("theoryTest") || {};
    const practiceExamResult = watch("practiceExam");

    const resultPhysicalTest = calculatePhysicalResult(physicalTest);
    const resultTheoryTest = calculateTheoryResult(theoryTest);
    const resultPracticeExam = calculateFinal({ resultPhysicalTest, resultTheoryTest, practiceExamResult });

    return (
        <form className="flex flex-col gap-4 p-4">
            <div className="flex gap-4">
                <Input label={"ชื่อ"} {...register("firstName", { required: true })} error={!!errors?.firstName} />
                <Input label={"นามสกุล"} {...register("lastName", { required: true })} error={!!errors?.lastName} />
                <div>
                    <Input label={"ครั้งที่"} {...register("time", { required: true })} error={!!errors?.time} />
                </div>
            </div>
            <div>
                <div className="flex gap-8 items-center">
                    <div>
                        <div className="flex gap-4">
                            <label className="block mb-1 font-medium">
                                ตาบอดสี
                            </label>
                            <InputRadio {...register("physicalTest.colorBlind")} label={"ผ่าน"} value={"ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.colorBlind") === "ผ่าน") {
                                        setValue("physicalTest.colorBlind", "");
                                    }
                                }}
                            />
                            <InputRadio {...register("physicalTest.colorBlind")} label={"ไม่ผ่าน"} value={"ไม่ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.colorBlind") === "ไม่ผ่าน") {
                                        setValue("physicalTest.colorBlind", "");
                                    }
                                }}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label className="block mb-1 font-medium">
                                สายตายาว
                            </label>
                            <InputRadio {...register("physicalTest.longSight")} label={"ผ่าน"} value={"ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.longSight") === "ผ่าน") {
                                        setValue("physicalTest.longSight", "");
                                    }
                                }}
                            />
                            <InputRadio {...register("physicalTest.longSight")} label={"ไม่ผ่าน"} value={"ไม่ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.longSight") === "ไม่ผ่าน") {
                                        setValue("physicalTest.longSight", "");
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-4">
                            <label className="block mb-1 font-medium">
                                สายตาเอียง
                            </label>
                            <InputRadio {...register("physicalTest.astigmatism")} label={"ผ่าน"} value={"ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.astigmatism") === "ผ่าน") {
                                        setValue("physicalTest.astigmatism", "");
                                    }
                                }}
                            />
                            <InputRadio {...register("physicalTest.astigmatism")} label={"ไม่ผ่าน"} value={"ไม่ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.astigmatism") === "ไม่ผ่าน") {
                                        setValue("physicalTest.astigmatism", "");
                                    }
                                }}
                            />
                        </div>
                        <div className="flex gap-4">
                            <label className="block mb-1 font-medium">
                                การตอบสนองร่างกาย
                            </label>
                            <InputRadio {...register("physicalTest.reactionTest")} label={"ผ่าน"} value={"ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.reactionTest") === "ผ่าน") {
                                        setValue("physicalTest.reactionTest", "");
                                    }
                                }}
                            />
                            <InputRadio {...register("physicalTest.reactionTest")} label={"ไม่ผ่าน"} value={"ไม่ผ่าน"}
                                onClick={() => {
                                    if (watch("physicalTest.reactionTest") === "ไม่ผ่าน") {
                                        setValue("physicalTest.reactionTest", "");
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    ผลการทดสอบ:
                    <span
                        className={
                            resultPhysicalTest === "ผ่าน"
                                ? "text-green-600"
                                : resultPhysicalTest === "ไม่ผ่าน"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                        }
                    >
                        {resultPhysicalTest}
                    </span>
                </div>
            </div>
            <div>
                <div className="flex gap-4">
                    <Input label={"ป้ายจราจร"} type="number" {...register("theoryTest.billBoard", {
                        min: {
                            value: 0,
                            message: "ค่าต้องไม่น้อยกว่า 0"
                        },
                        max: {
                            value: 50,
                            message: "ค่าต้องไม่เกิน 50"
                        },
                        valueAsNumber: true
                    })}
                        error={errors?.theoryTest?.billBoard?.message}
                    />
                    <Input label={"เส้นจราจร"} type="number" {...register("theoryTest.trafficLines", {
                        min: {
                            value: 0,
                            message: "ค่าต้องไม่น้อยกว่า 0"
                        },
                        max: {
                            value: 50,
                            message: "ค่าต้องไม่เกิน 50"
                        },
                        valueAsNumber: true
                    })}
                        error={errors?.theoryTest?.trafficLines?.message}
                    />
                    <Input label={"การให้ทาง"} type="number" {...register("theoryTest.givingWay", {
                        min: {
                            value: 0,
                            message: "ค่าต้องไม่น้อยกว่า 0"
                        },
                        max: {
                            value: 50,
                            message: "ค่าต้องไม่เกิน 50"
                        },
                        valueAsNumber: true
                    })}
                        error={errors?.theoryTest?.givingWay?.message}
                    />
                </div>
                <div>
                    ผลการทดสอบ:
                    <span className={
                        resultTheoryTest === "ผ่าน"
                            ? "text-green-600"
                            : "text-red-600"
                    }>
                        {resultTheoryTest}
                    </span>
                </div>
            </div>
            <div>
                <label>
                    การสอบปฏิบัติ
                </label>
                <InputRadio {...register("practiceExam")} label={"ผ่าน"} value={"ผ่าน"}
                    onClick={() => {
                        if (watch("practiceExam") === "ผ่าน") {
                            setValue("practiceExam", "");
                        }
                    }}
                />
                <InputRadio {...register("practiceExam")} label={"ไม่ผ่าน"} value={"ไม่ผ่าน"}
                    onClick={() => {
                        if (watch("practiceExam") === "ไม่ผ่าน") {
                            setValue("practiceExam", "");
                        }
                    }}
                />
            </div>
            <div>
                สรุปผลการทดสอบทั้งหมด:
                <span className={
                    resultPracticeExam === "ผ่านการทดสอบ"
                        ? "text-green-600"
                        : resultPracticeExam === "ไม่ผ่านการทดสอบ"
                            ? "text-red-600"
                            : "text-yellow-600"
                }>
                    {resultPracticeExam}
                </span>
            </div>
        </form>

    )
}