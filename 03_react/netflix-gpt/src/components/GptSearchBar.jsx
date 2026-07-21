
const GptSearchBar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-20 pt-40 flex justify-center">
        <form className="w-1/2 h-[80px] bg-black p-5 rounded flex gap-2.5">
            <input className="flex-1  bg-white p-2 px-3 rounded mr-2" type="text" placeholder="What would you like to watch today?" />
            <button className="w-[20%] text-white bg-red-600 rounded py-2 px-5 cursor-pointer">Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar