


export const calculateTheoryResult = (theory) => {
    const total =
        theory.billBoard +
        theory.trafficLines +
        theory.givingWay;

    return total >= 120 ? "ผ่าน" : "ไม่ผ่าน";
};