'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { createDbUser } from '../helpers'

const NavBar = () => {

  const [clashId, setClashId] = useState<string | undefined>(undefined);

  const [error, setError] = useState<string | null>(null)

  const user = useUser().user;

  useEffect(() => {

    if(user && clashId){
      setTimeout(() => {

        if(clashId.length < 8){
          setError('Please enter a valid id');
          return;
        }

      },2000)
      createDbUser({user, clashId});
    }

  },[clashId])

  return (
    <div className='bg-black text-white p-8 w-full h-auto flex justify-between'>

        <Link 
        href='/'
        className='w-[30%]'>
            <h1 className='font-bold text-lg'>
                Clash Guide
            </h1>
        </Link>

        {!clashId && (
            <input 
            type='text'
            className='w-full p-2 rounded-lg text-black'
            onChange={(e) => setClashId(e.target.value)}
            />
        )}

        {clashId}
      
    </div>
  )
}

export default NavBar
