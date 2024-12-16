'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const data = useSearchParams();
    const email = data.get("email");
    const code = data.get("code");

    let [msg, setMsg] = useState("");

    const verifyUser = async function() {
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/users/verify-email`, {email, code});
            if (res.data.success) setMsg("Email verification successfull ✅")
        } catch (error) {
            console.log(error);
            setMsg("Email verification unsuccessfull ❌")
        }
    }

    useEffect(()=>{
        verifyUser();
    },[])

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-700 via-black to-indigo-700">
            <div className="">
                <h1 className="bg-white text-black p-2 font-bold text-3xl text-center rounded-lg">{msg}</h1>
                <h1 className="text-white p-2 font-semibold text-xl text-center">Now got to <Link href={"/signin"} className="underline hover:text-blue-500">Signin page</Link></h1>
            </div>
            
        </div>
    )
}