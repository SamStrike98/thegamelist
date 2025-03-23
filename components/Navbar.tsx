import { auth } from '@/auth'
import React from 'react'
import LoginGoogle from './LoginGoogle';
import Logout from './Logout';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = async () => {
    const session = await auth();
  return (
    <div className='w-full flex flex-row fixed items-center justify-center bg-teal-400 '>
        <div className='container flex flex-row items-center justify-between px-[10px]'>
            <Link href="/"><Image src={'/logo.png'} alt='logo' width={250} height={250} className='w-[100px] h-[100px] cursor-pointer'/></Link>
            <div className='flex flex-row'>{!session?.user ? <LoginGoogle /> :<> {session?.user?.name} <Link href="/profile"><Image src={session.user.image!} className='rounded-full max-h-[30px]' width={30} height={30} alt="User Avatar"/></Link> <Logout /></>}</div>
        </div>

    </div>
  )
}

export default Navbar