import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axiosPublic from '@/utils/axiosPublic';
import { ISingleProperty  } from '@/types/global.types';
import Link from 'next/link';

const Property = () => {

    const router = useRouter()
    const { id } = router.query;

    async function fetchSingleProperty(id: string | string[] | undefined) : Promise<ISingleProperty> {
        const  { data } =  await axiosPublic.get<ISingleProperty>(`/properties/detail?externalID=${id}`);
        return data;
    }

    const { data } = useQuery<ISingleProperty>(["single-property", id], () => fetchSingleProperty(id), {
        enabled: !!id
    });

    console.log(data);
    return ( 
        <div>
            <Link href={'/'}>Back</Link>
            <div className="container">
                
            </div>
        </div>
    );
}
 
export default Property;