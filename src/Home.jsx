import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

function Home() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
      axios.put('http://localhost:3001/update/'+id)
      .then(result => {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === id ? { ...todo, done: true } : todo
          )
        );
      })
      .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
      axios.delete('http://localhost:3001/delete/'+id)
      .then(() => {
        // Update UI without reloading the page
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err))
    }

  return (
    <div className='home'>
      <h2>ToDo List</h2>
      <Create />
      {
        todos.length === 0 
        ?
        <div><h3>No Record</h3></div>
        :
        todos.map(todo => (
            <div className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                    {todo.done ? 
                      <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                    : <BsCircleFill className='icon'/>
                    }
                    <p className={todo.done ? "line_through":""}>{todo.task}</p>
                </div>
                <div>
                  <span><BsFillTrashFill className = 'icon' 
                  onClick={() => handleDelete(todo._id)}/></span>
                </div>
            </div>  
        ))
      }
    </div>
  )
}

export default Home
