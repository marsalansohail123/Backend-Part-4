import axios from "axios"
import { useEffect, useState } from "react"

function App() {

  const [inputValue, setInputValue] = useState("");

  const [todoData, setTodoData] = useState([]);

  const [refresh, setRefresh] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5174/api/todo")
      .then((res) => {
        console.log(res, "Response")
        setTodoData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [refresh])

  const addTodo = () => {

    const objToSend = {
      todo: inputValue,
    }

    axios.post("http://localhost:5174/api/todo", objToSend)
      .then((res) => {
        setRefresh(!refresh)
        console.log(res, "response")
      })
      .catch((err) => {
        console.log(err, "error")
      })

    // console.log("Added!", inputValue)
    // console.log(objToSend)
  }


  return (
    <>
      <input type="text" placeholder="Enter TODO" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={addTodo}>ADD TODO</button>

      <ul>

        {todoData.length > 0 ?
          todoData.map((e) =>
            <li key={e._key}>{e.todo} <button>Edit</button><button>Delete</button></li>)
          : <h1>NO TODOS BUDDY</h1>
        }


      </ul>
    </>
  )
}

export default App;