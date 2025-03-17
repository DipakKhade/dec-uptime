"use client";
import { SignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';


export default function Page() {
    const router = useRouter();
    const { user } = useUser();

  if(user){
    router.push('/')
  }

  return <>
    <main className='flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-50 sm:px-8'>
    <SignIn />
    </main>
  </>
}