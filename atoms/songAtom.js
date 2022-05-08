import { atom } from 'recoil'

export const currentTrackState = atom ({
    key: "currentTrackState",
    default: null
})

export const currentTrackIdState = atom ({
    key: "currentTrackIdState",
    default: false
})