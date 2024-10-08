import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DashSideBar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';


export default function Dashboard(){
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromURL = urlParams.get('tab')
        if(tabFromURL){
            setTabe(tabFromURL);
        }
    },[location.search])
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className = "md:w-56">
                {/*sidebar*/}
                <DashSideBar />

            </div>
            {/*profile*/}
            {tab==='profile' && <DashProfile />}
            {/*posts... */}
            {tab==='posts' && DashPosts}

        </div>
    )
}