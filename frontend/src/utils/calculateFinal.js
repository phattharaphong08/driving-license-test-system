


export const calculateFinal = (data) => {
    // console.log(data.resultTheoryTest.billBoard)
    if (!data.resultPhysicalTest || data.resultPhysicalTest === "รอพิจารณา" || 
        !data.resultTheoryTest || data.resultTheoryTest === "รอพิจารณา" ||
        !data.practiceExamResult) {
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