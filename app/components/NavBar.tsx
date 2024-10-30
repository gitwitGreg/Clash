'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { getClashId, createDbUser } from '../helpers'

const NavBar = () => {

  const [clashId, setClashId] = useState<string | undefined>(undefined);

  const [error, setError] = useState<string | null>(null)

  const user = useUser().user;

  const handleChange = (clashId: string) => {

    console.log('provided id: ', clashId);

    if(clashId.length < 8){
      setError('Please enter a valid id');
      return;
    }

    setTimeout(() => {
      createDbUser({user, clashId});
    },2000);

  }

  const searchForclashID = async() => {

    const dbClashId = await getClashId(user?.primaryEmailAddress?.emailAddress);

    setClashId(dbClashId);
    
  }

  useEffect(() => {
    if(user && !clashId){

      if(!user.primaryEmailAddress){
        console.log('no email yet');
        return;
      }

      searchForclashID();
    }
  },[user]);

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
            placeholder='Player Id'
            max={8}
            className='w-full p-2 rounded-lg text-black'
            onChange={(e) => handleChange(e.target.value)}
            />
        )}

        {clashId}
      
    </div>
  )
}

export default NavBar
