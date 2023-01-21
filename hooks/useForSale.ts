import {useQuery, useQueryClient} from "react-query";
import axiosPublic from "@/utils/axiosPublic";
import { IProperty } from "@/types/global.types";

async function fetchForSale() {
  return await axiosPublic.get('properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6');
}

export const useForSaleData = () => {
    return  useQuery('forSale', fetchForSale, { 
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
            const forSale = data.data.hits.map((forSale: IProperty) =>  {
                return { 
                    externalID:forSale.externalID,
                    coverPhoto: forSale.coverPhoto,
                    price: forSale.price,
                    rentFrequency: forSale.rentFrequency,
                    rooms: forSale.rooms,
                    baths: forSale.baths,
                    area: forSale.area,
                    title: forSale.title,
                    agency: forSale.agency,
                    isVerified: forSale.isVerified
                }
            })
            return forSale;
        }
    })
}