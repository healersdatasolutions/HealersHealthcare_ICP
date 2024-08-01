"use client";

import { useEffect, useState } from "react";
import { createClient } from "pexels";



export default function Video(params) {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const client = createClient(
      "LhtJn3NVHtJDEqtFWxsGGSWSMit93xRD4bxm9gnpsxHws1V9tGd4McA0"
    );
    const query = "consultation man woman doctor clinic cedric sofa";

    client.videos.search({ query, per_page: 1 }).then((response) => {
      if (response?.videos?.length > 0) {
        const videoUrl = response.videos[0].video_files[0].link;
        setVideoSrc(videoUrl);
      }
    });
  }, []);

  console.log(videoSrc);
  return (
    <>
      {videoSrc && (
        <>
          <main className="lg:pt-0 pt-20 pb-10 px-24">
            <video
              autoPlay
              muted
              loop
              className="w-full lg:h-full h-64 object-cover object-center lg:rounded-3xl rounded-xl"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </main>
        </>
      )}
    </>
  );
}