import {useQuery, UseQueryOptions} from "react-query";
import axiosPublic from "@/utils/axiosPublic";
import { IProperty } from "@/types/global.types";

async function fetchForRent() {
  return await axiosPublic.get('properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6');
}

export const useForRentData = () => {
    return  useQuery('forRents', fetchForRent, { 
        // cacheTime:5000
        // staleTime:30000 
        // refetchOnMount:true,
        refetchOnWindowFocus: false,
        keepPreviousData : true,
        // refetchInterval:3000,
        // refetchIntervalInBackground:true

        enabled: true,
        // onSuccess,
        // onError,
        select: (data) => {
            const forRent = data.data.hits.map((forRent: IProperty) =>  {
                return { 
                    externalID:forRent.externalID,
                    coverPhoto: forRent.coverPhoto,
                    price: forRent.price,
                    rentFrequency: forRent.rentFrequency,
                    rooms: forRent.rooms,
                    baths: forRent.baths,
                    area: forRent.area,
                    title: forRent.title,
                    agency: forRent.agency,
                    isVerified: forRent.isVerified
                }
            })
            return forRent;
        }
    })
}