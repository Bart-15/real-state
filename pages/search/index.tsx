import { useEffect } from 'react';
import { useRouter } from 'next/router'


const SearchProperty = () => {
    const router = useRouter();

    const { query } = router;

    useEffect(() => {
        if(!query.purpose) return; // 

        if(query.purpose !== 'for-sale' && query.purpose !== 'for-rent') {
            router.push('/')
        }
    }, [query.purpose])

    return ( 
        <div>
            <h1 className="text-2xl">Search Properties</h1>
        </div>
    );
}
 
export default SearchProperty;