
const GptSearchBar = () => {
  return (
    <div className="pt-50">
        <form className="w-1/2 bg-black p-5">
            <input type="text" placeholder="What would you like to watch today?" className="bg-white p-2 px-3 rounded mr-2"/>
            <button className="text-white bg-red-600 rounded p-2 px-3 cursor-pointer">Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar