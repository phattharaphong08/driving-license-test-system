



export const calculatePhysicalResult = (test) => {
    const values = [
        test.colorBlind,
        test.longSight,
        test.astigmatism,
        test.reactionTest
    ];

    const isComplete = values.every(v => v);

    if (!isComplete) {
        return "รอพิจารณา";
    };

    const passCount = values.filter(v => v === "ผ่าน").length;

    return passCount >= 3 ? "ผ่าน" : "ไม่ผ่าน";
};