const VideoTitle = ({ title, description }) => {
  return (
    <div className="pt-36 px-12">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{description}</p>
      <div className="flex gap-2 items-center justify-start">
        <button className="bg-zinc-400 text-black text-xl px-6 py-2.5 rounded cursor-pointer flex items-center gap-2">
         <span className="text-2xl">▶︎</span> Play
        </button>
        <button className="bg-zinc-400 text-black text-xl px-6 py-2.5 rounded cursor-pointer flex items-center gap-2">
         <span className="text-3xl">ⓘ</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
