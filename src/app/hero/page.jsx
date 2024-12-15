import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function Home() {
    return (
        <>
            <div className="bg-gradient-to-r from-indigo-700 via-black to-indigo-700 min-h-screen flex flex-col"> 
                {/* Navbar */} 
                <Navbar/>
                {/* Hero Section */} 
                <section className="flex-grow flex items-center justify-center mt-8"> 
                    <div className="container mx-auto px-4 py-20 text-center text-white"> 
                        <h2 className="text-5xl font-bold">Welcome to AutoDev</h2> 
                        <p className="mt-4 text-lg"> 
                            AutoDev assists in coding and helps in projects to make your coding journey easier 
                        </p> 
                        <Link href="#" className="mt-8 inline-block bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">Get Started</Link> 
                    </div> 
                </section> 
                {/* Features Section */} 
                <section className="container mx-auto px-4 py-16"> 
                    <div className="text-center mb-12"> 
                        <h3 className="text-2xl font-bold text-white">Features</h3> 
                        <p className="mt-2 text-white">Highlighting the key features of AutoDev.</p> 
                    </div> 
                    <div className="flex flex-wrap justify-center items-center -mx-4"> 
                        <div className="w-full md:w-1/3 px-4 mb-8 md:h-1/6"> 
                            <div className="p-6 bg-white shadow rounded-lg md:h-full"> 
                                <h4 className="text-lg font-bold text-gray-800">Feature One</h4> 
                                <p className="mt-2 text-gray-600">
                                    Prompt-based coding assistance to streamline development.
                                </p>
                            </div> 
                        </div> 
                        <div className="w-full md:w-1/3 px-4 mb-8 md:h-1/6"> 
                            <div className="p-6 bg-white shadow rounded-lg md:h-full"> 
                                <h4 className="text-lg font-bold text-gray-800">Feature Two</h4> 
                                <p className="mt-2 text-gray-600">Tools to help beginners start their coding journey smoothly.</p> 
                            </div> 
                        </div> 
                        <div className="w-full md:w-1/3 px-4 mb-8 md:h-1/6"> 
                            <div className="p-6 bg-white shadow rounded-lg md:h-full"> 
                                <h4 className="text-lg font-bold text-gray-800">Feature Three</h4> 
                                <p className="mt-2 text-gray-600">Comprehensive project support for all skill levels.</p> 
                            </div> 
                        </div> 
                    </div> 
                </section> {
                        /* Footer */} 
                <footer className="bg-neutral-900 text-white"> 
                    <div className="container mx-auto px-4 py-8 text-center"> 
                        <p className="text-sm">&copy; 2024 AutoDev. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}