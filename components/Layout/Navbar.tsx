import { useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { useDarkMode, useNav } from '@/hooks';
import { BsFillHouseFill } from 'react-icons/bs';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md'

const Navbar = () => {
	const router = useRouter();
	
    const { navOpen, setNavOpen } = useNav();
	const { isDark, setDark } = useDarkMode();	
	
	useEffect(() => {
		let isDarkMode = sessionStorage.getItem("darkMode");
        setDark(JSON.parse(isDarkMode!));
		console.log("firstRende")
	}, [])

	const handleDarkMode = () => {
		setDark(!isDark);
		sessionStorage.setItem("darkMode", JSON.stringify(!isDark));
	}
	
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
				<li className="ml-3">
					<label className="relative inline-flex items-center cursor-pointer">
						<input type="checkbox" value="" checked={isDark} onChange={handleDarkMode} className="sr-only peer" />
							<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
						<span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">{ isDark ? <MdDarkMode size={25}/> : <MdOutlineDarkMode size={25}/>}</span>
					</label>	
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
							<ul className="flex p-4 jusify-center items-center flex-row space-x-8 mt-0 text-sm font-medium border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 ">
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
								<li>
									<label className="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" value="" checked={isDark} onChange={handleDarkMode} className="sr-only peer" />
											<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
										<span className="ml-1 text-sm font-medium text-gray-900 dark:text-gray-300">{ isDark ? <MdDarkMode size={25}/> : <MdOutlineDarkMode size={25}/>}</span>
									</label>		
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