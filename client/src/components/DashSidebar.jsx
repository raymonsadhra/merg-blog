import React from 'react'
import { Sidebar } from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux' 

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromURL = urlParams.get('tab')
        if(tabFromURL){
            setTabe(tabFromURL);
        }
    },[location.search])
    const handleSignout = async () =>{
        try {
          const res = await fetch('/api/user/signout',){
            method:'POST',
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message);
          }
          else{
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
          
        }
       };
  return (
    <Sidebar className="w-full md:w-56 ">
        <Sidebar.Items>
            <Sidebar.ItemGroup>  
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={"User"} labelColor='dark' as ='div'>
                <Link to='/dashboard?tab=profile'>
                    Profile 
                </Link>
                </Sidebar.Item>
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                    Sign Out  
                </Sidebar.Item>
                    
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
