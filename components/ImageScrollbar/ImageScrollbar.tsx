import { useContext } from 'react';
import Image from 'next/image';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';


const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
        <div className="flex items-center justify-center mr-1">
            <FaArrowAltCircleLeft 
                onClick={() => scrollPrev()}
                className="cursor-pointer text-2xl"
            />
        </div>
    )
}

const RightArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
        <div className="flex items-center justify-center ml-1">
            <FaArrowAltCircleLeft 
                onClick={() => scrollPrev()}
                className="cursor-pointer text-2xl"
            />
        </div>
    )
}

const ImageScrollBar = ({data}: {data:any}) => {
    return ( 
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {
                data?.map((item:any) => (
                    <div key={item.id} className="overflow-hidden">
                        <Image placeholder="blur" blurDataURL={item.url} src={item.url} width="1000" height={500}  alt="bannerImage" sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
                    </div>
                ))
            }
        </ScrollMenu>
    );
}
 
export default ImageScrollBar;