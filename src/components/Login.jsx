import React, { useEffect } from 'react';
import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './partials/Header';

function Login() {
    const navigation=useNavigate();
      const [form,setForm]=useState({
        username:"",
        password:"",
      });
      useEffect(()=>{
        const user=localStorage.getItem('user');
        if(user){
          return navigation('/')
        }
      },[]);

    
     const [errors,setErrors]=useState(null);

     const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
     }  
    
     const handleSubmit= async()=>{
        
        const result=await login(form);
        console.log("form",result);
        setErrors(null)
      if(result.status==200){
        if(result.data.status===200){
            localStorage.setItem('user',JSON.stringify(result.data.data));
            navigation("/");
            return;
        }
         if(result.data.status===201){
            setErrors(result.data.data);
            return;
         }
         if(result.data.status===202){
             toast(result.data.message);
             return;
         }

      }



     }
  return (
    <>
    <Header/>
    <div className="container d-flex justify-content-center align-items-center vh-100">
        
      <div className="card p-4" style={{ maxWidth: '800px', width: '100%' }}>
      <ToastContainer/>
        <div className="card-body">
          <form>
            <legend><b>LOGIN FORM</b></legend>
            <div className="form-group row">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">WELCOME</label>
              <div className="col-sm-10">
                <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address or Name</label>
              <input type="text" className="form-control" onChange={handleChange} name="username" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
             
              {errors?.username &&( <small id="emailHelp" className="form-text text-muted">{errors.username.message}</small>)}
             

            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
              <input type="password" className="form-control"  onChange={handleChange}  name="password" id="exampleInputPassword1" placeholder="Password" autoComplete="off" />
              {errors?.password && (
                <small id="emailHelp" className="from-text text-muted">
                    {errors.password.msg}
                </small>
              )}
            </div>


            <div className="form-group mt-4"> {/* Added margin here */}
              <button type="button" onClick={handleSubmit} className="btn btn-dark">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div></>
  );
}

export default Login;
