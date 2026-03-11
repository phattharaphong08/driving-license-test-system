



export const calculatePhysicalResult = (test) => {
    const passCount = [
        test.colorBlind,
        test.longSight,
        test.astigmatism,
        test.reactionTest
    ].filter(v => v === "ผ่าน").length;

    return passCount >= 3 ? "ผ่าน" : "ไม่ผ่าน";
};