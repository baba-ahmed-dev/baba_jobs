import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { startAction,successAction , errorAction } from '../slices/Auth';
import { idaction } from '../slices/Idaction';

import axios from 'axios';
import { useAlert } from 'react-alert';


const Login = () => {
    const [username,  setUsername] = useState()
    const [password,  setPassword] = useState()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    

    
    const login =  (username, password) => {
        dispatch(startAction())
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            username : username,
            password : password
        })
    
        axios.post('/api/auth/login', body , config)
        .then(res => {
            localStorage.setItem("token",res.data.token);
            dispatch(successAction(res.data));
            dispatch(idaction(res.data.user.id));
            navigate('/')
            
         }).catch(err => { 
            dispatch(errorAction());
            alert.show("invalid username or password")
          })
    }

    const onsubmit = (e) => {
        e.preventDefault()
        login(username, password);
    }
    
    return(
        <div className='col-md-6 m-auto'>
            <div className='card card-body login-mr'>
                <h2 className='text-center'>Login</h2>
                <form onSubmit={onsubmit}>
                    <div className='form-group'>
                        <label>Username</label>
                        <input type='text' className="form-control" name="username" onChange={(e)=>setUsername(e.target.value)}  value={username || ''}/>
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' className="form-control" name="password" onChange={(e)=>setPassword(e.target.value)} value={password || ''} />
                    </div>
                    
                    <div className='form-group'>
                       <button type="submit" className='btn btn-primary'>Login</button>
                    </div>
                    <p>Don't have an account? <Link to='/register'>Register</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;