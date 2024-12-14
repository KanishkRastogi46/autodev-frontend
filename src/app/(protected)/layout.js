'use client';

import useUserContext from "@/lib/user/userContext";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Auth({children}) {
    let {setUser} = useUserContext();
    let router = useRouter();

    let fetchUser = async () => {
        try {
            let res = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/auth`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
                }
            })
            if (res.data) setUser(res.data)
        } catch (error) {
            console.log(error)
            if (error) router.push("/signin")
        }   
    }
    
    useEffect(()=>{
    fetchUser()
    }, [])

    return (
        <div className="w-full h-screen text-white bg-gray-100">
            {children}
        </div>
    )
}