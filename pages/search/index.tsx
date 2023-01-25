import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SearchFilter, Card } from '@/components'
import { IProperty } from '@/types/global.types';
import { BiMenuAltLeft } from 'react-icons/bi'
import Image from 'next/image'
import axiosPublic from '@/utils/axiosPublic';
import noresult from '../../assets/images/noresult.svg'

const SearchProperty = ({properties} : {properties: IProperty[]}) => {
    const router = useRouter();
    
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

    return ( 
        <div className="mt-2">
            <div className="bg-slate-200 p-4 rounded transition duration-300 dark:bg-gray-900">
                <h2 className="text-1xl md:text-2xl flex items-center justify-center font-bold">Search Property by Filters<BiMenuAltLeft onClick={() => setFiltersOpen(!filtersOpen)} className="ml-1 cursor-pointer"/></h2>
                {filtersOpen && <SearchFilter />}
            </div>
            <p className="text-1xl md:text-2xl p-2 font-bold">Search: &quot;{ router.query.purpose }&quot;</p>
            <div>
                {
                    properties.length !== 0 ? (<Card data={properties}/>) : (
                        <div className="flex flex-col justify-center items-center">
                            <Image className="w-full max-w-sm" src={noresult} alt="no result"/>
                            <div className="flex justify-center items-center">
                                <p className="text-sm md:text-2xl mt-2">No Results found </p>
                                <span className=" ml-1 md:text-2xl">👉🥺👈</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
 
export default SearchProperty;

type IQuery = {
    purpose: string;
    rentFrequency:string;
    minPrice:string;
    maxPrice:string;
    roomsMin: string;
    bathsMin: string;
    sort:string;
    areaMax: string;
    locationExternalIDs:string;
    categoryExternalID:string;
}

export async function  getServerSideProps({query} : {query: IQuery}) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const { data } = await axiosPublic.get(`/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
            properties: data.hits,
        },
    };
}   