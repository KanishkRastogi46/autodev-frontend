import Link from "next/link"
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
        <header className="bg-neutral-900 text-white shadow-black w-full absolute top-0 left-0 right-0"> 
            <div className="container mx-auto px-4 py-6 flex justify-between items-center"> 

                <h1 className="text-2xl font-bold text-white">
                    <Link href="/">AutoDev</Link>
                </h1> 
                <nav> 
                    <ul className="md:flex hidden space-x-4"> 
                        <li><Link href="/prompt-page" className="hover:text-blue-500">Prompt</Link></li> 
                        <li><Link href="/pic-site" className="hover:text-blue-500">PicSite</Link></li> 
                        <li><Link href="/code-editor" className="hover:text-blue-500">Editor</Link></li> 
                        <li><Link href="/signin" className="bg-white border-2 border-red-500 text-red-500 p-2 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500">Signin</Link></li> 
                    </ul> 
                </nav> 
                <div className="md:hidden">
                    <button
                        className="focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`${isMenuOpen ? '' : 'hidden flex-col items-start justify-center'} md:hidden`}>
                <Link href="/prompt-page" className="block px-4 py-2 hover:bg-blue-500">Prompt</Link>
                <Link href="/pic-site" className="block px-4 py-2 hover:bg-blue-500">PicSite</Link>
                <Link href="/code-editor" className="block px-4 py-2 hover:bg-blue-500">Editor</Link>
                <Link href="/signin" className="block w-[30vw] text-center mb-2 px-4 py-2 bg-white border-2 border-red-500 text-red-500 p-2 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500">Signin</Link>
            </div>
        </header> 
    )
}