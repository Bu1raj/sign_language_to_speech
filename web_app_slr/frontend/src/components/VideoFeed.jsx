import React, { useEffect, useState } from "react";

const VideoFeed = () => {
  return (
    <div className="flex justify-center">
      <div className="overflow-clip w-auto h-auto rounded-lg shadow-2xl">
        <img
          className="w-auto h-[450px] object-cover"
          src="http://127.0.0.1:5000/video_feed"
          alt="Video Feed"
        />
      </div>
    </div>
  );
};

export default VideoFeed;
