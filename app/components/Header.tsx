'use client';
import React, { useEffect } from 'react'
import Image from 'next/image'
import { HiSearch, HiBell, HiChat } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react"
import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from './../shared/firebaseConfig';

function Header() {
  const { data: session } = useSession()
  const imageUrl = session?.user?.image ?? '/man.png';

  const db = getFirestore(app);

  useEffect(() => {
    saveUserInfo();
  }, [session])

  const saveUserInfo = async() =>{
    if(session?.user){
        await addDoc(collection(db, "user"), {
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image
        });
    }
  }

  return (
    <div className='flex gap-3 md:gap-2 items-center p-6 '> 
        <Image src='/logo.png' alt='logo' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'/>
        <button className='bg-black text-white p-2 rounded-full px-4 hidden md:block'>
            Home
        </button>
        <button className='font-semibold p-2 rounded-full px-4'>
            Create
        </button>
        <div className='bg-[#e9e9e9] p-3 flex gap-3 items-center rounded-full w-full hidden md:flex'>
            <HiSearch className='text-[25px] text-gray-500 md:hidden'/>
            <input type="text" placeholder='Search' className='bg-transparent outline-none'/>
        </div>
        <HiBell className='text-[40px] text-gray-500'/>
        <HiChat className='text-[40px] text-gray-500'/>
        {
          session?.user?
         <Image src={imageUrl} alt='user-image' width={50} height={50} className='hover:bg-gray-300 p-2 rounded-full cursor-pointer' /> 
          :
          <button className='font-semibold p-2 rounded-full px-4' onClick={() => signIn()}>LogIn</button>
        }
    </div>
  )
}

export default Header