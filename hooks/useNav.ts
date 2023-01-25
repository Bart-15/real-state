import { useState, useEffect } from 'react';

const useNav = () : {
    navOpen:boolean,
    setNavOpen: (navOpen: boolean) => void
} => {

    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
		
        handleResize();

        window.addEventListener("resize", handleResize);

        width >= 768 && setNavOpen(false);
        
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    return {
        navOpen, 
        setNavOpen
    }
}

export default useNav;