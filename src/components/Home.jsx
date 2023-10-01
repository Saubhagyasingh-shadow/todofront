import React, { useEffect, useState } from 'react'
import Header from './partials/Header'
import Todo from './partials/Todo'
import AddTodoModal from './partials/AddTodoModal'
import { Navigate, useNavigate } from 'react-router-dom'
import { GetTodoListApi, getToken } from '../services/api'

function Home() {
  const navigation = useNavigate();

  const [list, setList] = useState([]);
  const [refreshList, setrefreshList] = useState();
  const [setFilteredList,setSetFilteredList]=useState([]);


  const [searchText,setSearchText]=useState("")

  useEffect(() => {
    if (!getToken()) {
      navigation('/login')
    }
    fetchTodoList()
  }, [refreshList]);
  
  

  async function fetchTodoList() {
    const result = await GetTodoListApi();
    console.log("todolist", result)
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse())
    }
  }

  return ( 
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />

      <h1 style={{ textAlign: 'center' }}>YOUR TODO LIST</h1>

      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {list.map((todo) => <Todo todo={todo} key={todo._id} setrefreshList={setrefreshList} />)}
        </div>
      </div>

      <div className='' style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1040 }}>
        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-light'>ADD</button>
      </div>

      <AddTodoModal setrefreshList={setrefreshList} />
    </div>
  )
}

export default Home
