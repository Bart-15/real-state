import {useQuery} from "react-query";
import {IProperty} from "@/types/global.types";
import axiosPublic from "@/utils/axiosPublic";

const useQueryFetch = (purpose: string, queryKey: string) => {
  return useQuery<IProperty[], Error>(
    queryKey,
    async (): Promise<Array<IProperty>> => {
      const {data} = await axiosPublic.get(
        `properties/list?locationExternalIDs=5002&purpose=${purpose}&hitsPerPage=6`
      );
      return data.hits;
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: true,
    }
  );
};

export default useQueryFetch;
