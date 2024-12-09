"use client"

import Image from "next/image";
import PromptPage from "./home/page";
import useUserContext from "@/lib/user/userContext";
import SigninForm from "./(auth)/signin/page";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  let {user, setUser} = useUserContext()

  let fetchUser = async () => {
    try {
      let res = await axios.get("http://localhost:8000/auth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
        }
      })
      if (res.data.email) setUser(res.data)
      console.log(res.data)
      // console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    fetchUser()
  }, [])

  console.log(`user: ${user.email} and ${user.profile_img}`)
  if (user.email === "") {
    return (
      <div className="w-full h-screen  text-white bg-gray-100">
        <SigninForm/>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen  text-white bg-gray-100">
      <PromptPage/>
    </div>
  );
}
