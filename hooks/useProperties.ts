import axiosPublic from "@/utils/axiosPublic";
import { IProperty } from "@/types/global.types";
import { useInfiniteQuery } from "react-query";


async function fetchProperties(
    queryPurpose: string | string[] | undefined
    ) : Promise<Array<IProperty>> {
    const { data } = await axiosPublic.get(`properties/list?locationExternalIDs=5002&purpose=${queryPurpose}&hitsPerPage=24`);
    return data.hits;
}


export const useProperties = ({purpose} : {
    purpose: string | string[] | undefined,
}) => {
    return useInfiniteQuery<IProperty[], Error, IProperty[]>(
        ['properties', purpose],
        () => fetchProperties(purpose),
        {
            getNextPageParam: (lastPage, pages) => {
                if(pages.length < 500!) {
                    return pages.length + 1
                } else {
                    return undefined;
                }
            },
            keepPreviousData : true,
            refetchOnWindowFocus: false,
            enabled: true
        }
    )
}