import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FFFFFF] h-screen">
       <Navbar />
       <Header/>
    </div>
  );
}