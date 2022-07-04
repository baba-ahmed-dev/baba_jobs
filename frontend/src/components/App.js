import React ,{useState, useEffect, useLayoutEffect ,useRef, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router , Route  , Routes , useNavigate} from 'react-router-dom';
import {errorAction, startAction, successAction } from './slices/Auth';
import axios from 'axios';
import Header from './header/Header';
import Register from './account/Register';
import Login from './account/Login';
import Home from './Home';
import Profile from './account/Profile';
import Detail from './Detail';
import CreateCompany from './bars/CreateCompany';
import EditProfile from './account/EditProfile';
import EditDetail from './account/EditDetail';
import Search from './Search';
import Searchjob from './bars/Searchjob';


const App = () =>  {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const Token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    const loadMe = () => {
        dispatch(startAction())
        const token = Token;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(token){
            config.headers['Authorization'] = `Token ${token}`
        }
        axios.get('/api/auth/user', config)
        .then(res => {
            dispatch(successAction(res.data))
        }).catch(err => {
           dispatch(errorAction())
        })
    }
    
    useEffect(()=>{
        loadMe()
        if(isAuthenticated == false){
           navigate("/login")
        }
    },[])
    
    return (
       
            <Fragment>
                    
                   
                    <Header />
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />  
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/detail" element={<Detail />} />
                            <Route path="/editprofile" element={<EditProfile />} />
                            <Route path="/createcompany" element={<CreateCompany />} />
                            <Route path="/editdetail" element={<EditDetail />} />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </div>
                    
            </Fragment>
        
        
        )
    
};
export default App;