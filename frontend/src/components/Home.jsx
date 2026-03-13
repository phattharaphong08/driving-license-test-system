import { useForm } from "react-hook-form";
import { Input } from "./ui/Input";




export const Home = ({ dataAll, selectEditId, selectDelete }) => {

    const { register } = useForm();

    const getResultColor = (result) => {
        switch (result) {
            case "ผ่านการทดสอบ":
                return "bg-green-100 text-green-700";
            case "ไม่ผ่านการทดสอบ":
                return "bg-red-100 text-red-700";
            case "รอพิจารณา":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-gray-100 text-gray-700";
        };
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6">

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                    รายชื่อผู้สมัครสอบ
                </h3>

                <div className="w-64">
                    <Input
                        {...register("search")}
                        placeholder="ค้นหาชื่อ..."
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                ครั้งที่สอบ
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                                ชื่อ-นามสกุล
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                สถานะ
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                วันที่
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                แก้ไข
                            </th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">
                                ลบ
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {dataAll.map((item) => {
                            const { id, exam_time, name, result, created_at } = item;

                            return (
                                <tr key={id} className="hover:bg-gray-50 transition">

                                    <td className="px-4 py-3">{exam_time}</td>

                                    <td className="px-4 py-3">
                                        {name}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getResultColor(result)}`}
                                        >
                                            {result}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {created_at}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                            onClick={() => selectEditId(id)}
                                        >
                                            แก้ไข
                                        </button>
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <button className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                            onClickCapture={() => selectDelete(id)}
                                        >
                                            ลบ
                                        </button>
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>
            </div>

        </div>
    )
}