import { useQuery } from "@tanstack/react-query";

import { getDrivingLicense } from "./drivingLicense.api";



export const useDrivingLicense = () => useQuery({
    queryKey: ["driving-license"],
    queryFn: () => getDrivingLicense(),
})