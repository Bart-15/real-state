import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from '@/components/Card/Card';
import { useProperties } from '@/hooks/useProperties';
import useDebounce from '@/hooks/useDebounce';
import { filterData } from '@/utils/filterData';

const SearchProperty = () => {
    const router = useRouter();

    const { query } = router;

    const filters = useState(filterData)
    const [purpose, setPurpose] = useState<string | undefined | string[]>('');
    const [search, setSearch] = useState<string | undefined>("");

    const searchQuery = useDebounce(search, 500);



    useEffect(() => {
        if(!query.purpose) return; // 

        if(query.purpose !== 'for-sale' && query.purpose !== 'for-rent') {
            router.push('/')
        }

        setPurpose(query.purpose);
    }, [query.purpose])


    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useProperties({
        purpose,
    })
        
    return ( 
        <div>
            <div className="text-center md:text-left">
                <h2 className="text-2xl">Search - 
                    <span className="font-bold ml-2">&quot;{purpose}&quot;</span>
                </h2>
            </div>
        
            {
                data?.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        <Card data={group}/>
                    </React.Fragment>
                ))
            }
            <div className="flex flex-col mt-10 justify-center items-center">
                <button className="bg-blue-600 p-3 text-white rounded cursor-pointer hover:bg-blue-700  transition duration-200" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                    {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More': 'Nothing more to load'}
                </button>
                <div className="mt-2">Fetching{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
            </div>
        </div>
    );
}
 
export default SearchProperty;