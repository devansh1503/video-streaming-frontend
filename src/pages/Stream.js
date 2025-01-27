import React, { useEffect, useState } from 'react'
import HLSPlayer from '../components/HLSPlayer'

function Stream({key}) {
  const [streamUrl, setUrl] = useState("");
  useEffect(()=>{
    const streamKey = JSON.parse(localStorage.getItem('userCred')).streamKey
    setUrl(`http://localhost:8080/hls/${streamKey}.m3u8`)
  },[])
  return (
    <div>
      <HLSPlayer src={streamUrl}/>
    </div>
  )
}

export default Stream