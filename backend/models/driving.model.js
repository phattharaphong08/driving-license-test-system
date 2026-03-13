import sql from "../configs/db.js";

export const passToBit = (value) => {
    if (value === "ผ่าน") return 1;
    if (value === "ไม่ผ่าน") return 0;
    return null;
};

export const bitToPass = (value) => {
    if (value === 1) return "ผ่าน";
    if (value === 0) return "ไม่ผ่าน";
    return "รอพิจารณา";
};

export const calculatePhysicalResult = (test = {}) => {
    // console.log("test", test.color_blind)
    const values = [
        test.color_blind,
        test.long_sight,
        test.astigmatism,
        test.reaction_test
    ];

    if (values.some(v => !v)) {
        return "รอพิจารณา";
    }

    const passCount = values.filter(v => v === "ผ่าน").length;

    return passCount >= 3 ? "ผ่าน" : "ไม่ผ่าน";
};

export const calculateTheoryResult = (bill_board, traffic_lines, giving_way) => {
    // console.log(bill_board, traffic_lines, giving_way);
    const total = bill_board + traffic_lines + giving_way;

    if (total === "" || total === 0) {
        return "รอพิจารณา";
    }

    return total >= 120 ? "ผ่าน" : "ไม่ผ่าน";
};

export const calculateFinal = (data) => {
    // console.log(data)
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

export const formatDate = (date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
};


export const drivingModel = {
    create: async (data) => {
        console.log("ข้อมูลบันทึก", data);

        const result = await sql.query`
            INSERT INTO applicants
            (
                first_name,
                last_name,
                exam_time,
                color_blind,
                long_sight,
                astigmatism,
                reaction_test,
                bill_board,
                traffic_lines,
                giving_way,
                practice_exam
            ) 
            VALUES
            (
                ${data.firstName},
                ${data.lastName},
                ${Number(data.time)},
                ${passToBit(data.physicalTest?.colorBlind)},
                ${passToBit(data.physicalTest?.longSight)},
                ${passToBit(data.physicalTest?.astigmatism)},
                ${passToBit(data.physicalTest?.reactionTest)},
                ${Number(data.theoryTest?.billBoard)},
                ${Number(data.theoryTest?.trafficLines)},
                ${Number(data.theoryTest?.givingWay)},
                ${passToBit(data.practiceExam)}
            )
        `;

        return result;
    },

    // ส่งเเค่ ชื่อ-นามสกุล, ผลสรุปการทดสอบ, ครั้ง, วันที่
    findAll: async () => {
        const result = await sql.query(`
            SELECT 
                applicant_id,
                first_name,
                last_name,
                exam_time,
                color_blind,
                long_sight,
                astigmatism,
                reaction_test,
                bill_board,
                traffic_lines,
                giving_way,
                practice_exam,
                created_at
            FROM applicants
        `);

        const data = result.recordset.map(item => {

            const physicalTest = {
                color_blind: bitToPass(Number(item.color_blind)),
                long_sight: bitToPass(Number(item.long_sight)),
                astigmatism: bitToPass(Number(item.astigmatism)),
                reaction_test: bitToPass(Number(item.reaction_test))
            };

            const resultPhysical = calculatePhysicalResult(physicalTest);

            const resultTheory = calculateTheoryResult(Number(item.bill_board), Number(item.traffic_lines), Number(item.giving_way));

            const resultFinal = calculateFinal({
                resultPhysicalTest: resultPhysical,
                resultTheoryTest: resultTheory,
                practiceExamResult: bitToPass(Number(item.practice_exam))
            });

            return {
                id: item.applicant_id,
                name: `${item.first_name} ${item.last_name}`,
                exam_time: item.exam_time,
                created_at: formatDate(item.created_at),
                result: resultFinal
            };
        });

        return data;
    },

    findById: async (id) => {
        const result = await sql.query(`
            SELECT * 
            FROM applicants 
            WHERE applicant_id = ${id}
        `);

        return result.recordset[0]
    },

    update: async (id, data) => {
        // console.log(data)

        const result = await sql.query`
            UPDATE applicants
            SET
                first_name = ${data.firstName},
                last_name = ${data.lastName},
                exam_time = ${Number(data.time)},
                color_blind = ${passToBit(data.physicalTest?.colorBlind)},
                long_sight = ${passToBit(data.physicalTest?.longSight)},
                astigmatism = ${passToBit(data.physicalTest?.astigmatism)},
                reaction_test = ${passToBit(data.physicalTest?.reactionTest)},
                bill_board = ${data.theoryTest?.billBoard},
                traffic_lines = ${data.theoryTest?.trafficLines},
                giving_way = ${data.theoryTest?.givingWay},
                practice_exam = ${passToBit(data.practiceExam)}
            WHERE applicant_id = ${id}
        `;

        return result;
    },

    delete: async (id) => {

        const result = await sql.query`
            DELETE FROM applicants
            WHERE applicant_id = ${id}
        `;

        return result;
    }
}