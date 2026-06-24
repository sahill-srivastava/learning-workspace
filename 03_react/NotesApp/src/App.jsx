import { useState } from "react";
import { X } from 'lucide-react';

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [task, setTask] = useState([]);




  function submitHandler(e) {
    e.preventDefault();
    const copyTask = [...task];

    copyTask.push({
      title,
      description,
    });

    setTask(copyTask);
  }

  function deleteNote(index) {

    const copyTask = [...task]
    copyTask.splice(index, 1);
    setTask(copyTask);

  }

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="h-full py-10 flex flex-col items-center gap-10  border-r-[3px]">
        <h2 className="text-4xl">Add Notes</h2>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="w-1/2 h-full flex flex-col gap-5"
        >
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="px-2 py-1 rounded-sm text-gray-600"
            type="text"
            placeholder="Add notes..."
          />

          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="px-2 py-1 rounded-sm h-1/2 text-gray-600"
            placeholder="Write notes..."
          ></textarea>

          <button className="rounded-md py-1 text-black bg-white border-none outline-1 outline-red">
            Add Note
          </button>
        </form>
      </div>

      <div className="h-full py-10 flex flex-col items-center gap-10 overflow-hidden">
        <h2 className="text-4xl">Recent Notes</h2>

        <div className="w-full px-10 grid grid-cols-3 gap-6 overflow-y-auto">
          {task.map((item, index) => {
            // console.log(item);
            // console.log(index);

            return (
              <div key={index} className="text-black relative rounded-lg min-h-60 w-full p-4 bg-cover bg-[url(https://i.pinimg.com/1200x/84/7f/2c/847f2ccfd6708d01928af1bb886c47f5.jpg)]">
                <div onClick={() => {
                  deleteNote(index)
                }} className="absolute top-1 right-1 cursor-pointer"><X /></div>
                <h4 className="mb-2 font-semibold">{item.title}</h4>
                <p className="text-sm">{item.description}</p>
              </div>
            );
          })}

          
        </div>
      </div>
    </div>
  );
};

export default App;
