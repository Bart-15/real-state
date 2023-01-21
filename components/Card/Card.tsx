
import Image from 'next/image';
import {FaBed, FaBath, FaToriiGate} from 'react-icons/fa';
import { IProperty } from '@/types/global.types';
import millify from 'millify';
import Link from 'next/link'

const Card = ({data} : { data:IProperty[] }) => {
    return ( 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-8">
            {
            data?.map((data) =>{
                return (
                <Link href={`/property/${data.externalID}`} passHref key={data.externalID}>
                    <div className="card bg- hover:shadow-lg transition duration-300">
                        <Image className="w-full h-32 sm:h-48 object-cover cursor-pointer" src={data.coverPhoto.url} width={500} height={300} alt="Image" />
                        <div className="m-4">
                            <span className="font-medium">AED د.إ{ data.price } { data.rentFrequency && `/${data.rentFrequency}` } /yearly</span>
                        </div>
                        <div className="m-4 flex flex-col">
                            <div className="flex flex-row items-center">

                                <div className="flex flex-row items-center mr-3">
                                    <p className="text-gray-700 mr-1">{ data.rooms }</p>
                                    <FaBed className="text-gray-600 mr-3"/> |
                                </div>

                                <div className="flex flex-row items-center mr-3">
                                    <p className="text-gray-700 mr-1">{ data.baths }</p> 
                                    <FaBath className="text-blue-500 mr-3"/> |
                                </div>

                                <div className="flex flex-row items-center mr-3">
                                    <p className="text-gray-700 mr-1">{millify(data.area)} sqft</p> 
                                    <FaToriiGate className="text-blue-500"/>
                                </div>
                                
                            </div>
                            <span className="block text-gray-500 text-sm text-light">{data.title.length > 30 ? data.title.substring(0, 30) + '...' : data.title}</span>
                        </div>
                        <div className="badge">
                            {/* <ClockIcon className="w-5 inline-block mr-1"/> */}
                            {/* <span>{recipe.cookfor}</span> */}
                        </div>
                    </div>
                </Link>
                )
            })
        }
        </div>
    );
}

export default Card;