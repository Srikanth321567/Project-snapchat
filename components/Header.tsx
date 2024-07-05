import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Home from '@/public/home.png';
import { Button } from './ui/button';
import { FaLaptop } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { Input } from './ui/input';
import { auth } from '@/auth';
const Header = async () => {
  const authUser = await auth();
  console.log(authUser?.user);
  
  return (
    <div className='flex justify-between items-center max-w-6xl mx-auto'>
       <div>
          <h1 className='text-3xl font-medium'>Log in to Snapchat</h1>
          
          <h1><br/>Chat,Snap, and video call your friends. Watch Stories<br/> and Spotlight, all from your computer.<br/></h1>
          <h1><br/>Username or email address<br/></h1>
          <br/>
          <Input type='text' placeholder='enter here'/>
          <br/>
          {
            authUser
                ?
                <Link href={"/login"}><Button className='gap-2 rounded-full'><AiOutlineMessage size='18px'/>Start chat</Button></Link>
                :
                <Link href={"/login"}><Button className='gap-2 rounded-full'><FaLaptop/>Login to chat</Button></Link>
          }
          
       </div>
       <div>
          <Image src={Home} alt='homepage' width={650} height={650}/>
       </div>
    </div>
  );
}

export default Header;
