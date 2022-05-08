import {
    HeartIcon,
    SwitchHorizontalIcon,
    VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
    FastForwardIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
    RewindIcon,
    VolumeUpIcon,
    SwitchHorizontalicon,
} from "@heroicons/react/solid";import { debounce } from "lodash";
 import { useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState, currentTrackState } from "../atoms/songAtom"
import useSongInfo from "../hooks/useSongInfo"
import useSpotify from "../hooks/useSpotify"

function Player() {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsplaying] = useRecoilState(currentTrackState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo(null)

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log("Now playing: ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsplaying(data.body?.is_playing);
                });
            });
        }
    };

    const handePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body?.is_playing) {
                spotifyApi.pause()
                setIsplaying(false)
            } else {
                spotifyApi.play()
                setIsplaying(true)
            }
        })
    }

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch(err => {})
        }, 500), 
        []
    )

    useEffect(() => {
        if(volume > 0 && volume < 100){
            debouncedAdjustVolume(volume)
        }
    }, [volume])

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackIdState, spotifyApi, session])

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-white text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4 ">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon onClick={() => spotifyApi.skipToPrevious()} className="button" />

                {isPlaying ? (
                    <PauseIcon onClick={handePlayPause} className="button w-10 h-10" />
                ) : (
                    <PlayIcon onClick={handePlayPause} className="button w-10 h-10" />
                )
                }

                <FastForwardIcon onClick={() => spotifyApi.skipToNext()} className="button" />
                <ReplyIcon className="button" />
            </div>

            <div className="flex items-center space-x-3 md:space-x-4 justify-end">
                <VolumeDownIcon onClick={() => volume > 9 && setVolume(volume - 10)} className="button" />
                <input
                    className="w-14 md:w-28"
                    type="range"
                    value={volume}
                    min={0} max={100}
                    onChange={(e) => setVolume(Number(e.target.value))} />
                <VolumeUpIcon onClick={() => {
                    volume < 91 && setVolume(volume + 10)
                    console.log(volume)
                }} className="button" />
            </div>
        </div>
    )
}

export default Player
