import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

const HLSPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({liveDurationInfinity: true,});
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest loaded.");
        videoRef.current.play();
      });

      return () => hls.destroy(); // Cleanup on component unmount
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });
    } else {
      console.error("HLS is not supported in this browser.");
    }
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      style={{
        width: "100%",
        height: "auto",
        backgroundColor: "#000",
      }}
    />
  );
};

export default HLSPlayer;
