import { useRecoilState } from "recoil"
import { currentTrackIdState, currentTrackState } from '../atoms/songAtom' 
import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time"


function Song({ order, track }) {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsplaying] = useRecoilState(currentTrackState)

    const playSong = async () => {
        setCurrentTrackId(track.track.id)
        setIsplaying(true)
        spotifyApi.play({
            uris: [track.track.uri]
        })
    }

    return (
        <div className="grid grid-cols-2 text-gray-500 py-2 px-3 hover:bg-gray-900 rounded-lg cursor-pointer "
        onClick={playSong}>
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img className="h-10 w-10 rounded-full" src={track.track.album.images[0].url} alt="" />
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
                    <p className="w-40">{track.track.artists[0].name}</p>
                </div>
            </div>

            <div className="flex items-center justifiy-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline">{track.track.album.name}</p>
                <p className="ml-auto">{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>


    )
}

export default Song