import Link from "next/link"

export default function Navbar() {
    return (
        <header className="bg-neutral-900 text-white shadow-black w-full absolute top-0 left-0 right-0"> 
            <div className="container mx-auto px-4 py-6 flex justify-between items-center"> 
                <h1 className="text-2xl font-bold text-white">
                    <Link href="/">AutoDev</Link>
                </h1> 
                <nav> 
                    <ul className="flex space-x-4"> 
                        {/* <li><Link href="#" className="hover:text-blue-500">Home</Link></li>  */}
                        <li><Link href="/prompt-page" className="hover:text-blue-500">Prompt</Link></li> 
                        <li><Link href="/pic-site" className="hover:text-blue-500">PicSite</Link></li> 
                        <li><Link href="/code-editor" className="hover:text-blue-500">Editor</Link></li> 
                        <li><Link href="/signin" className="bg-white border-2 border-red-500 text-red-500 p-2 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500">Signin</Link></li> 
                    </ul> 
                </nav> 
            </div> 
        </header> 
    )
}