import Link from 'next/link'

const Footer = () => {
    return ( 
        <footer className="flex items-center flex-col p-4 bg-white rounded-lg shadow md:flex md:flex-row md:items-center md:justify-between md:p-6 dark:bg-gray-800 my-10">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://github.com/Bart-15/real-state" target="_blank" rel="noreferrer" className="hover:underline">Real State App™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <Link href="/search?purpose=for-rent" className="mr-4 hover:underline md:mr-6 ">Rental Homes</Link>
                </li>
                <li>
                    <Link href="/search?purpose=for-sale" className="mr-4 hover:underline md:mr-6">For Sale</Link>
                </li>
                <li>
                    <Link href="/" className="mr-4 hover:underline md:mr-6">Contact</Link>
                </li>
            </ul>
        </footer>
    );
}
 
export default Footer;