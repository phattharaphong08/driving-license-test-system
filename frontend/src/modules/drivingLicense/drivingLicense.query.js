import { useQuery } from "@tanstack/react-query";

import { getDrivingLicense, getDrivingLicenseById } from "./drivingLicense.api";



export const useDrivingLicense = () => useQuery({
    queryKey: ["driving-license"],
    queryFn: () => getDrivingLicense(),
});

export const useDrivingLicenseById = (id) => useQuery({
    queryKey: ["driving-license-id", id],
    queryFn: () => getDrivingLicenseById(id),
    enabled: !!id,
    refetchOnMount: true
});