import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axiosPublic from '@/utils/axiosPublic';
import { ImageScrollbar, Card } from '@/components';
import { useProperties } from '@/hooks';
import { ISingleProperty  } from '@/types/global.types';
import { GoVerified } from 'react-icons/go';
import { FaBed, FaBath, FaToriiGate } from 'react-icons/fa';
import millify from 'millify';

const Property = () => {

    const router = useRouter()
    const { id } = router.query;

    async function fetchSingleProperty(id: string | string[] | undefined) :  Promise<ISingleProperty> {
        const  { data } =  await axiosPublic.get<ISingleProperty>(`/properties/detail?externalID=${id}`);
        return data;
    }

    const { data, isLoading } = useQuery<ISingleProperty, Error>(["single-property", id], () => fetchSingleProperty(id), {
        enabled: false,
        keepPreviousData:true,
        refetchOnWindowFocus:false,
    });

    const { data: infiteData, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useProperties({purpose:data?.purpose})
    
    if(isLoading) {
        return (
            <div className="container text-center">
                <p className="font-bold">Loading ...</p>
            </div>
        )
    }
    
    return ( 
        <div>
            <div className="container">
                <ImageScrollbar data={data?.photos}/>
            </div>
            <div className="container w-full">
                <div className="mt-2 px-6">
                    <div className="flex flex-row justify-start items-center mt-2">
                        <GoVerified className="text-sm md:text-sm text-green-700 mr-1" />
                        <p className="text-sm md:text-1xl font-bold">AED {data?.price} {data?.rentFrequency && `/${data?.rentFrequency}`}</p>
                    </div>
                    <div className="flex flex-row items-center mt-1">
                        <div className="flex flex-row items-center mr-3">
                            <p className="text-gray-700 mr-1">{ data?.rooms }</p>
                            <FaBed className="text-blue-500 mr-3"/> |
                        </div>

                        <div className="flex flex-row items-center mr-3">
                            <p className="text-gray-700 mr-1">{ data?.baths }</p> 
                            <FaBath className="text-blue-500 mr-3"/> |
                        </div>

                        <div className="flex flex-row items-center mr-3">
                            <p className="text-gray-700 mr-1">{millify(data?.area)} sqft</p> 
                            <FaToriiGate className="text-blue-500"/>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-sm md:text-1xl font-bold uh3percase mt-1">{data?.title}</h3>
                        <p className="text-sm font-light leading-6 indent-8 md:indent-10">{data?.description}</p>
                    </div>
                    <div className="mt-2">
                        <div>
                            <h3 className="text-1xl font-bold">Property Details</h3>
                            <ul className="list-disc">
                                <li className="ml-10 mt-1 text-sm">
                                    <p className='uppercase'><span className="font-bold">TYPE</span> - {data?.type}</p>
                                </li>
                                <li className="ml-10 mt-1 text-sm">
                                    <p className="uppercase"><span className="font-bold">Purpose</span> - {data?.purpose}</p>
                                </li>
                                {data?.furnishingStatus && (
                                    <li className="ml-10 mt-1 text-sm">
                                        <p className="uppercase"><span className="font-bold">Furnishig Status</span> - {data?.furnishingStatus}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <hr className="text-stale-200 my-5"/>
                    {
                        data?.amenities.length !== 0 ? (
                            <div className="">
                                <h3 className="text-1xl font-bold">Ammenities</h3>
                                <div className="flex flex-wrap">
                                    {
                                        data?.amenities.map((item: any) => (
                                            item.amenities.map((amenity:any) => (
                                                <p className="p-2 bg-slate-200 font-bold text-blue-500 rounded mr-1 mt-1 text-sm md:text-l hover hover:bg-blue-700 dark:bg-blue-700 dark:text-white hover:text-white transition duration-150" key={amenity.externalID}>
                                                    {amenity.text}
                                                </p>
                                            ))
                                        ))
                                    }
                                </div>
                            </div>
                        ) : null
                    }
                    <div className="mt-10">
                        <h3 className="text-2xl font-bold">More Properties</h3>
                        {
                            infiteData?.pages.map((group, i) => (
                                <React.Fragment key={i}>
                                    <Card data={group}/>
                                </React.Fragment>
                            ))
                        }
                        <div className="flex flex-col mt-10 justify-center items-center">
                            <button className="bg-blue-600 p-3 text-white rounded cursor-pointer hover:bg-blue-700  transition duration-200" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                                {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More': 'Nothing more to load'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Property;