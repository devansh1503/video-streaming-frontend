import React from 'react'
import HLSPlayer from '../components/HLSPlayer'

function Stream({key}) {
  const streamUrl = `http://localhost:8080/hls/test.m3u8`
  return (
    <div>
      <HLSPlayer src={streamUrl}/>
    </div>
  )
}

export default Stream