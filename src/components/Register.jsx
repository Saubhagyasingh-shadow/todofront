import React, { useState } from 'react';
import { register } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Header from './partials/Header';

function Register() {
  const [form, setForm] = useState({
    username:"",
    password:"",
    email:"",
    name:"",
  });

  const navigation = useNavigate();
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit =  async () => {
    const result =  await register(form);
    console.log("hello")
    //console.log(form);
    console.log("result",result);
    setErrors(null);
    if (result.status === 200) {
      console.log(result.data.status);
      if (result.data.status === 201) {
        setErrors(result.data.data);
        window.alert(result.data.message);
        return;
      }
      else if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        navigation('/');
        return;
      } 
      
     else if (result.data.status === 202) {
        window.alert(result.data.message);
        return;
      }
      else{
        window.alert("error o")
      }
    } 
  }

  return (
    <>
    <Header/>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <ToastContainer />
      <div className="card p-4" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="card-body">
          <form>
            <legend><b>REGISTER FORM</b></legend>
            <div className="form-group">
              <label htmlFor="exampleInputUsername">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="name"
                id="exampleInputname"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputUsername">Username</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                name="username"
                id="exampleInputUsername"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                name="email"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={handleChange}
                name="password"
                id="exampleInputPassword"
                placeholder="Password"
                autoComplete="off"
              />
            </div>
            <div className="form-group mt-4">
              <button type="button" onClick={handleSubmit} className="btn btn-dark">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div></>
  );
}

export default Register;
