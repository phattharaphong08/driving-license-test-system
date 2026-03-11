


export const calculateFinal = (data) => {
    // console.log(data)
    if (!data.resultPhysicalTest || !data.resultTheoryTest || !data.practiceExamResult) {
        return "รอพิจารณา";
    };

    if (
        data.resultPhysicalTest === "ผ่าน" &&
        data.resultTheoryTest === "ผ่าน" &&
        data.practiceExamResult === "ผ่าน"
    ) {
        return "ผ่านการทดสอบ";
    };

    return "ไม่ผ่านการทดสอบ";
};