import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axiosPublic from '@/utils/axiosPublic';
import { ISingleProperty  } from '@/types/global.types';
import ImageScrollBar from '@/components/ImageScrollbar/ImageScrollbar';
import Link from 'next/link';

const Property = () => {

    const router = useRouter()
    const { id } = router.query;

    async function fetchSingleProperty(id: string | string[] | undefined) :  Promise<ISingleProperty> {
        const  { data } =  await axiosPublic.get<ISingleProperty>(`/properties/detail?externalID=${id}`);
        return data;
    }

    const { data } = useQuery<ISingleProperty, Error>(["single-property", id], () => fetchSingleProperty(id), {
        enabled: !!id
    });

    

    console.log(data?.photos);
    return ( 
        <div>
            <Link href={'/'}>Back</Link>
            <div className="container">
                <ImageScrollBar data={data?.photos}/>
            </div>
        </div>
    );
}
 
export default Property;