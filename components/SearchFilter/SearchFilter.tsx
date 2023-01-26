import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { filterData, getFilterValues, IObjectKeys } from '@/utils/filterData';
import { useRouter } from 'next/router';
import { useDebounce } from '@/hooks';
import { ILocation } from '@/types/global.types';
import { ImLocation2 } from 'react-icons/im'
import axiosPublic from '@/utils/axiosPublic';


const SearchFilter = () => {
    const router = useRouter();
    const [filters, setFilter] = useState(filterData)

    const [searchQuery, setSearchQuery] = useState<string | undefined>("")
    const [searchFocus, setSearchFocus] = useState<boolean>(true)

    const searchProperties = (filterValues: IObjectKeys ) => {
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues)
            
        values.forEach((item) => {
            if(item.value && filterValues?.[item.name]) {
                query[item.name] = item.value
            }
        });

        router.push({ pathname: path, query: query });
    }
    
    const debounceQuery = useDebounce(searchQuery);

    const fetchLocations = async() : Promise<Array<ILocation>> => {
        const {data} = await axiosPublic.get(`/auto-complete?query=${debounceQuery}`);

        return data.hits;
    }

    const { data, error, isLoading } = useQuery<ILocation[], Error>({
        queryKey:['locations', debounceQuery],
        queryFn: fetchLocations,
        select: (data) => {
            const newData = data.map((data) => {
                return {
                    id:data.id,
                    externalID:data.externalID,
                    name:data.name,
                }
            })
            return newData; 
        },
        refetchOnWindowFocus:false,
        enabled: true
    })

    return (
        <>
            <div className="flex justify-center flex-wrap mt-5">
                {filters.map((filter) => (
                    <div key={filter.queryName}>
                        <select className="p-2 m-1 rounded bg-slate-300  text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-slate-100" onChange={(e) => searchProperties({ [filter?.queryName]: e.target.value })}>
                            <option value="" disabled selected>{filter.placeholder}</option>
                            {
                                filter.items.map((item) => (
                                    <option className="rounded bg-white dark:bg-gray-700 dark:text-slate-50" value={item.value} key={item.value}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex flex-col px-4">
                <div className="mb-3 xl:w-96 mt-2 md:w-80 relative">
                    <label className="py-2 text-sm text-gray-800 dark:text-white font-medium">
                        Location: 
                        { searchQuery && (<span className="ml-1">&quot;{searchQuery}&quot;</span>) }
                    </label>
                    <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocus(true)}
                    onBlur={() => setTimeout(() => {
                        setSearchFocus(false)
                    }, 250)}
                    className="form-control block w-full px-3 mt-1 py-1.5 text-base font-normal rounded dark:text-white focus:outline-none dark:shadow-sm transition duration-100"
                    placeholder="Search Location.."
                    />
                    {
                        searchFocus && (
                            <div className="bg-white mt-2 shadow-lg rounded absolute w-full md:w-80 xl:w-96 dark:bg-gray-700 dark:text-white transition-opacity overflow-auto h-auto max-h-80" style={{zIndex:1}}>
                                <ul className="">
                                    {
                                        data?.length !== 0 ? data?.map((location) => {
                                            return (
                                                <li key={location.id} className="dark:text-slate-100 cursor-pointer px-4 py-3 rounded block hover hover:bg-slate-300  transition duration-100">
                                                    <div className="flex flex-start hover:text-gray-900" onClick={() => {
                                                    searchProperties({ locationExternalIDs: location.externalID });
                                                    setSearchQuery("");
                                                    setSearchFocus(false)
                                                    }}>
                                                        <ImLocation2 className="text-red-600 mr-2" size={20}/> <p className="text-sm md:text-1xl ">{location.name}</p>
                                                    </div>
                                                </li>
                                            )
                                        }) : ''
                                    }
                                </ul>
                                {
                                    !isLoading && data?.length === 0 && (
                                        <div className="text-center">
                                            <p className="font-medium text-center p-1">Location not found.</p>
                                        </div>
                                    ) 
                                }
                            </div>
                        )
                    }
                </div>           
            </div>
        </> 
    
    );
}
 
export default SearchFilter;


