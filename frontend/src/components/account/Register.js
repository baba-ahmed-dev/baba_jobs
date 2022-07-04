import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { successAction,register_success, errorAction } from '../slices/Auth';

const Register = () => {
    const [username,  setUsername] = useState()
    const [email,  setEmail] = useState()
    const [password,  setPassword] = useState()
    const [password2,  setPassword2] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
 

    const register =  (username, password, email) => {
     
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            username : username,
            password : password,
            email: email
        })
    
        axios.post('/api/auth/register', body , config)
        .then(res => {
            dispatch(register_success(res.data))
            
            alert.show("Registred successfully")
            navigate('/')
         }).catch(err => { 
            dispatch(errorAction());
            alert.show("A user with that username already exists")
            
          })
    }

    const onsubmit = (e) => {
        e.preventDefault()
        if(password !== password2){
            alert.show("passwords do not match")
        }else{
            register(username , password , email)
        }
       
    }
    
    return(
        <div className='col-md-6 m-auto'>
            <div className='card card-body login-mr'>
                <h2 className='text-center'>Register</h2>
                <form onSubmit={onsubmit}>
                    <div className='form-group'>
                        <label>Username</label>
                        <input type='text' className="form-control" name="username" onChange={(e)=>setUsername(e.target.value)}  value={username || '' }/>
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type='email' className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)} value={email || ''} />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' className="form-control" name="password"  onChange={(e)=>setPassword(e.target.value)} value={password || ''} />
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input type='password' className="form-control" name="password2"  onChange={(e)=>setPassword2(e.target.value)} value={password2 || ''} />
                    </div>
                    <div className='form-group'>
                        <button type="submit" className='btn btn-primary'>Register</button>
                    </div>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register;