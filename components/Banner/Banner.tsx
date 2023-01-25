import Image from 'next/image'
import Link from 'next/link'
import {IBanner} from  '../../types/global.types'


const Banner = (props: IBanner) => {
    return (
        <div className="container max-w-5xl mx-auto transition duration-200">
            <div className="grid md:grid-cols-2">
                <div className="md:mb-10">
                    <Image className="rounded-sm" src={props.imageSrc} width={500} height={300} alt="banner"/>
                </div>
                <div className="p-5 md:mt-10 dark:text-slate-300">
                    <span className="text-xs md:text-sm uppercase text-red-500">{props.smallTitle}</span>
                    <h2 className="text-2xl md:text-4xl mb-1">{props.title}</h2>
                    <p className="mb-4">{props.shortDescription}</p>
                    <Link href={props.pageLink} className="btn mt-2 md:text-base bg-slate-300 text-gray-700 font-bold hover hover:bg-slate-700 hover:text-white transition duration-500 dark:bg-blue-700 dark:text-white">{props.buttonTxt}</Link>
                </div>
            </div>
        </div> 
    );
}

export default Banner;