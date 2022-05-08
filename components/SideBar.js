import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
} from '@heroicons/react/outline'

import SideBarItem from './SideBarItem'
import useSpotify from '../hooks/useSpotify'

import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'

function SideBar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    return (
        <div className='text-gray-500 p-5 pb-36 border-gray-900 overflow-y-scroll scrollbar-hide h-screen 
        text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
            <div className='space-y-2'>

                <SideBarItem icon={<SearchIcon />} text="Search" />
                <SideBarItem icon={<HomeIcon />} text="Home" />
                <SideBarItem icon={<LibraryIcon />} text="Your Library" />

                <hr className='border-t-[0.1px] border-gray-900' />

                <SideBarItem icon={<PlusCircleIcon />} text="Create Playlist" />
                <SideBarItem icon={<HeartIcon />} text="Liked Songs" />
                <SideBarItem icon={<RssIcon />} text="Your Episodes" />

                <hr className='border-t-[0.1px] border-gray-900' />
                
                {playlists.map((playlist) => (
                    <p key={playlist.id} onClick={() => {
                        setPlaylistId(playlist.id)
                        console.log(playlist.id)
                    }} className='cursor-pointer hover:text-white'>{playlist.name}</p>
                ))}

            </div>
            <div className='h-5'></div>
        </div >
    )
}


export default SideBar
