


export const calculateTheoryResult = (theory) => {
    const total =
        theory.billBoard +
        theory.trafficLines +
        theory.givingWay;

    if (total === "" || total === 0) {
        return "รอพิจารณา";
    }

    return total >= 120 ? "ผ่าน" : "ไม่ผ่าน";
};