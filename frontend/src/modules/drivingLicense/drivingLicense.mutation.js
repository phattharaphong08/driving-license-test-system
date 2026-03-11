import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { addDrivingLicense } from "./drivingLicense.api";



export const useAddDrivingLicense = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addDrivingLicense,
        onSuccess: () => {
            Swal.fire({
                title: "บันทึกสำเร็จ!",
                text: "ข้อมูลถูกบันทึกเรียบร้อย",
                icon: "success",
                confirmButtonText: "ตกลง"
            });
            queryClient.invalidateQueries("driving-license");
        }
    })
}