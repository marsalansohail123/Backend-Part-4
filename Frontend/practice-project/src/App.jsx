import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "./config";

function App() {

  const [inputValue, setInputValue] = useState("");

  const [todoData, setTodoData] = useState([]);

  const [refresh, setRefresh] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/todo")
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

    axios.post(`${BASE_URL}todo`, objToSend)
      .then((res) => {
        if (res.data.status) {
          setRefresh(!refresh)
        } else {
          alert(res.data.message)
        }
        console.log(res, "response")
      })
      .catch((err) => {
        console.log(err, "error")
      })

    // console.log("Added!", inputValue)
    // console.log(objToSend)
  }

  const deleteTodo = (uID) => {
    // console.log(uID)
    axios.delete(`http://localhost:8000/api/todo/${uID}`)
      .then((res) => {
        if (res.data.status) {
          setRefresh(!refresh)
          console.log(res.data.message, true)
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err, "error")
      })
  }

  const editTodo = (uID) => {
    // console.log(uID);
    const newVal = prompt("Add Updated TODO");
    // console.log(uID, newVal)
    const objToSend = {
      todo: newVal,
      id: uID
    };
    axios.put("http://localhost:8000/api/todo", objToSend)
      .then((res) => {
        if (res.data.status) {
          setRefresh(!refresh);
          console.log(res.data, "updated")
          return
        }
      }).catch((err) => {
        console.log(err, "error")
      })
  }

  return (
    <>
      <input type="text" placeholder="Enter TODO" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={addTodo}>ADD TODO</button>

      <ul>

        {todoData.length > 0 ?
          todoData.map((e) =>
            <li key={e._id}>{e.todo} <button onClick={() => editTodo(e._id)}>Edit</button><button onClick={() => deleteTodo(e._id)}>Delete</button></li>)
          : <h1>NO TODOS BUDDY</h1>
        }


      </ul>
    </>
  )
}

export default App;