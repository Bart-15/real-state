import { useQuery } from "react-query";
import { IProperty, GetPropertyResponse } from "@/types/global.types";
import axiosPublic from "@/utils/axiosPublic";

export const useFetchProperty = (purpose: string, queryKey: string) => {
    return useQuery<GetPropertyResponse, Error>(queryKey, async() => {
        const data = await axiosPublic.get(`properties/list?locationExternalIDs=5002&purpose=${purpose}&hitsPerPage=6`) as GetPropertyResponse;
        return data;
    }, {
        refetchOnWindowFocus: false,
        enabled: false,
    })
}
