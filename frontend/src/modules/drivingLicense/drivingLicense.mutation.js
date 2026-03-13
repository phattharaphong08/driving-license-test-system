import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addDrivingLicense, editDrivingLicense, deleteDriving } from "./drivingLicense.api";



export const useAddDrivingLicense = ({ onReset, onClose, onSelect }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }) => {
            if (id) {
                return editDrivingLicense(id, data);
            };

            return addDrivingLicense(data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["driving-license"] });
            onReset?.();
            onClose?.();
            onSelect?.();

            Swal.fire({
                title: "บันทึกสำเร็จ!",
                text: "ข้อมูลถูกบันทึกเรียบร้อย",
                icon: "success",
                confirmButtonText: "ตกลง"
            });

        },

        onError: (error) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error?.response?.data?.message || "ไม่สามารถบันทึกข้อมูลได้",
                icon: "error"
            });
        }
    })
};

export const useDeleteDrivingLicense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteDriving(id),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["driving-license"]
            });

            Swal.fire({
                title: "ลบข้อมูลสำเร็จ",
                text: "ข้อมูลถูกลบเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
        },

        onError: (error) => {
            Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: error?.response?.data?.message || "ไม่สามารถลบข้อมูลได้",
                icon: "error",
                confirmButtonText: "ตกลง"
            });
        }
    });
};