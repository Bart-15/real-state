import React, { useEffect, useState } from 'react';
import { filterData, getFilterValues, IObjectKeys } from '@/utils/filterData';
import { useRouter } from 'next/router';


const SearchFilter = () => {
    const router = useRouter();
    const [filters, setFilter] = useState(filterData)

    const [searchFilter, setSearchFilter] = useState<boolean>(false); // TODO

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

        console.log(query)
    }   

    return ( 
        <div>
            <div className="flex justify-center flex-wrap mt-5">
                {filters.map((filter) => (
                    <div key={filter.queryName}>
                        <select className="p-2 m-1 rounded bg-slate-300  text-gray-700 focus:outline-none" onChange={(e) => searchProperties({ [filter?.queryName]: e.target.value })}>
                            <option value="" disabled selected>{filter.placeholder}</option>
                            {
                                filter.items.map((item) => (
                                    <option className="rounded bg-white hover" value={item.value} key={item.value}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                ))}
            </div>
            <div className="mt-5">

            </div>
        </div>
    );
}
 
export default SearchFilter;


