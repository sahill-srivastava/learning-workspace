const VideoTitle = ({ title, description }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-right from black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{description}</p>
      <div className="flex gap-4 items-center justify-start">
        <button className="bg-white text-black hover:opacity-70 text-xl px-6 py-2.5 rounded cursor-pointer flex items-center gap-2">
         <span className="text-2xl">▶︎</span> Play
        </button>
        <button className="bg-white/40  hover:bg-white/20 text-white text-xl px-6 py-2.5 rounded cursor-pointer flex items-center gap-2">
         <span className="text-3xl">ⓘ</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
