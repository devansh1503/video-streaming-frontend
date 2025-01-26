import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

let socket = io('http://localhost:4000');

function Obs() {
    const [mediaStream, setMediaStream] = useState(null)
    const [rtmpUrl, setRtmpUrl] = useState('');
    const [key, setKey] = useState('');
    const videoRef = useRef(null)

    useEffect(()=>{
        const initMedia = async()=>{
            try{
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                })
                setMediaStream(stream)
                if(videoRef.current){
                    videoRef.current.srcObject = stream;
                }
            }
            catch(err){
                console.error(err)
            }
        }
        initMedia();
        // return () => {
        //     if(socket.current) socket.current.disconnect()
        //     if(mediaStream){
        //         mediaStream.getTracks().forEach((track) => track.stop())
        //     }
        // }
    },[])

    const startStreaming = () =>{
        if (!rtmpUrl || !key) {
            alert("Please provide both RTMP URL and Key.");
            return;
        }
        socket.emit('start-stream', { rtmp_url: rtmpUrl, key: key });
        if(mediaStream) {
            const mediaRecorder = new MediaRecorder(mediaStream, {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                framerate: 25,
            })

            mediaRecorder.ondataavailable = (event) =>{
                if(socket){
                    socket.emit('binarystream', event.data);
                }
            }

            mediaRecorder.start(25);
            mediaRecorder.onerror = (err) => {
                console.error('MediaRecorder error:', err);
            };
            alert("You are live now!")
        };
    }
  return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <div style={{width:'100%', backgroundColor:'black', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <video 
                id='user-video' 
                ref={videoRef} 
                autoPlay 
                muted 
                style={{width:'40%'}}
            ></video>
        </div>
        <div style={{ margin: '10px 0' }}>
        <input
          placeholder="Enter RTMP URL"
          value={rtmpUrl}
          onChange={(e) => setRtmpUrl(e.target.value)}
          style={{border:'none', fontSize:'20px', margin:'20px', padding:'5px', width:'70%', border:'1px solid grey' }}
        />
        <input
          placeholder="Enter Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          type='password'
          style={{border:'none', fontSize:'20px', margin:'20px', padding:'5px', width:'70%', border:'1px solid grey' }}
        />
      </div>
      <button onClick={startStreaming} style={{ padding: '10px 20px', cursor: 'pointer', margin:'20px', border:'none', fontSize:'20px', backgroundColor:"#FF3399" }}>
        Start Streaming
      </button>
      <button onClick={()=>{
        setRtmpUrl("rtmp://rtmp_server:1935/live")
        setKey("test")
      }} style={{ padding: '10px 20px', cursor: 'pointer', margin:'20px', border:'none', fontSize:'20px', backgroundColor:"#FF3399" }}>
        User local RTMP Keys
      </button>
    </div>
  )
}

export default Obs