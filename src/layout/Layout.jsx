import React from 'react'
import { Outlet } from 'react-router'
import HeartTransition from '../components/HeartTransition'
import MusicControl from '../components/MusicControl'
import PetalCursor from '../components/PetalCursor'
import { AudioProvider } from '../context/AudioContext'

const Layout = () => {
  return (
    <AudioProvider>
        <HeartTransition />
        <PetalCursor />
        <MusicControl />
        <Outlet />
    </AudioProvider>
  )
}

export default Layout
