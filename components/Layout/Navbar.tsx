import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsFillHouseFill } from 'react-icons/bs';

const Navbar = () => {
	const router = useRouter();

	const { systemTheme, theme, setTheme } = useTheme();
    
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(0);
    
	const { query } = router;
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        width >= 768 && setNavOpen(false);
        
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

	const MobileMenu = () => {
		return (
			<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
				<li onClick={() => setNavOpen(false)}>
					<Link href="/" className={`${router.pathname === '/' ? 'nav-active' : 'nav-link'} md:hidden `} aria-current="page">Home</Link>
				</li>
				<li onClick={() => setNavOpen(false)}>
					<Link href="/search?purpose=for-rent" className="nav-link">Rental Homes</Link>
				</li>
				<li onClick={() => setNavOpen(false)}>
					<Link href="/search?purpose=for-sale" className="nav-link">For Sale</Link>
				</li>
				<li onClick={() => setNavOpen(false)}>
					<Link href="#" className="nav-link">Contact</Link>
				</li>
			</ul>
		)
	}
	
    return ( 
		<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
				<Link href="/" className="flex items-center">
					<BsFillHouseFill className="h-6 mr-3 sm:h-9" size={32}/>
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Real State</span>
				</Link>
				<button type="button" className="nav-hamburger" onClick={() => setNavOpen(!navOpen)}>
					<span className="sr-only">Open main menu</span>
					<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
					</svg>
				</button>
				<div className={`${navOpen ? '' : 'hidden'} w-full md:block md:w-auto border-slate-100`}>
					{
						navOpen ? <MobileMenu /> : (
							<ul className="flex p-4  flex-row space-x-8 mt-0 text-sm font-medium border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 ">
								<li>
									<Link href="/" className={`${router.pathname === '/' ? 'nav-active' : 'nav-link'} md:hidden `} aria-current="page">Home</Link>
								</li>
								<li>
									<Link href="/search?purpose=for-rent" className="nav-link">Rental Homes</Link>
								</li>
								<li>
									<Link href="/search?purpose=for-sale" className="nav-link">For Sale</Link>
								</li>
								<li>
									<Link href="#" className="nav-link">Contact</Link>
								</li>
							</ul>
						)
					}
				</div>
			</div>
		</nav>
    );
}
 
export default Navbar;