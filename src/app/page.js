import Image from "next/image";
import PromptPage from "./home/page";

export default function Home() {
  return (
    <div className="w-full min-h-screen  text-white bg-gray-100">
      <PromptPage/>
    </div>
  );
}
