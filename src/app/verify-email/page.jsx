'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const data = useSearchParams();
    const email = data.get("email");
    const verificationCode = data.get("code");
    // console.log(data)

    let [msg, setMsg] = useState("");

    const verifyUser = async function() {
        try {
            let res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/users/verify-email`, {email, verificationCode});
            if (res.data.success) setMsg("Email verification successfull")
        } catch (error) {
            console.log(error);
            setMsg("Email verification unsuccessfull")
        }
    }

    useEffect(()=>{
        verifyUser();
    },[])

    console.log(email, verificationCode)

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-700 via-black to-indigo-700">
            <div className="">
                <h1 className="bg-green-300 text-black p-2 font-bold text-3xl text-center">{msg}</h1>
                <h1 className="text-white p-2 font-semibold text-xl text-center">Now got to <Link href={"/signin"} className="underline hover:text-blue-500">Signin page</Link></h1>
            </div>
            
        </div>
    )
}