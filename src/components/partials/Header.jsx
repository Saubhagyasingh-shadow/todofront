import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Header({searchText,setSearchText}) {
   const navigation=useNavigate();
   const [user,setUser]=useState(null)
  const handleLogout=()=>{
    localStorage.clear();
    navigation('/login');
  }
  
  useEffect(()=>{
   const u=localStorage.getItem('user');
   setUser(u);
  },[])

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">TODOLIST APP</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home
              <span className="visually-hidden">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
          {user && <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>logout</a>
          </li>}
          
        </ul>
        {user  && <form className="d-flex">
          <input className="form-control me-sm-2" type="search" value={searchText} placeholder="Search" onChange={(e)=>setSearchText(e.target.value)}/>
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>}
        
      </div>
    </div>
  </nav>
  )
}

export default Header
