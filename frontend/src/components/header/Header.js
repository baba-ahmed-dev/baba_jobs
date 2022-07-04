import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { errorAction } from '../slices/Auth';
import { Profilesuccess } from '../slices/ProfileSlice';
import { ssearchGlobalC, ssearchGlobalJ } from '../slices/SearchSlice';
import axios from 'axios';
import { useAlert } from 'react-alert';


const Header = () => {
    const [show , setShow] = useState(false)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const isStaff = useSelector(state => state.auth.staff)
    const user = useSelector(state => state.auth.user)
    const Token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const [myq, setMyq] = useState()

    const logout = () => {
        const token = Token;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(token){
            config.headers['Authorization'] = `Token ${token}`
        }
        axios.post('/api/auth/logout',null , config)
        .then(res => {
            dispatch(errorAction())
        }).catch(err => {
           console.log(err);
        })
    }

    const showProfile = () => {
        const myid = user.id;
        axios.get("/api/getid/"+myid)
        .then(res => {dispatch(Profilesuccess(res.data.id))})
        .then(re => {
            navigate("/profile")
        })
    }

    const handlMenu = () => {
        if(show){
            setShow(false)
        }else{
            setShow(true)
        }
    }
    const authLinks = (
        <ul className='ul-nav'>
            <li className=''>
                <i onClick={handlMenu} className="fa fa-bars" aria-hidden="true"></i>
            </li> 
            <div className='menuDiv' style={{display: show ? "block" : "none" }}>
                <li ><Link className='myli linky' to="/" ><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                <li ><button className='myli myli-btn sp' onClick={showProfile}><i className="fa fa-user" aria-hidden="true"></i> Profile</button></li>
                <li ><Link onClick={logout} className='myli linky' to="/login" ><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link></li>
                
            </div>
        </ul>
    )
    const guestLinks = (
        <ul className='ul-nav'>
            <li className=''>
                <i onClick={handlMenu} className="fa fa-bars" aria-hidden="true"></i>
            </li> 
            <div className='menuDiv' style={{display: show ? "block" : "none" }}>
                <li ><Link className='myli linky' to="/" ><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                <li ><Link className='myli linky' to="/login" ><i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link></li>
               
            </div>
        </ul>
    )
    const staffLinks = (
        <ul className='ul-nav'>
            <li className=''>
                <i onClick={handlMenu} className="fa fa-bars" aria-hidden="true"></i>
            </li>
            
            <div className='menuDiv' style={{display: show ? "block" : "none" }}>
                <li ><Link className='myli linky' to="/" ><i className="fa fa-home" aria-hidden="true"></i> Home</Link></li>
                <li ><button className='myli myli-btn' onClick={showProfile}><i className="fa fa-user" aria-hidden="true"></i> Profile</button></li>
                <li ><Link className='myli linky' to="/createcompany" ><i className="fa fa-plus" aria-hidden="true"></i> Create</Link></li>
                <li ><Link onClick={logout} className='myli linky' to="/login" ><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</Link></li>
                
            </div>
        </ul>
    )
    
    

    const subSearch = (e) => {
        e.preventDefault();
        if(myq && myq.length>0){
            let endpoints = [
                '/api/getjobsglobal/'+myq,
                '/api/getjobscompany/'+myq
            ]
            Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data:jobs},{data:companies}])=>{
                dispatch(ssearchGlobalJ(jobs));
                dispatch(ssearchGlobalC(companies));
                navigate('/search')
            })
        }else{
            alert.show("No input")
        }
        
    }
    return(
        <Fragment>
            <div className='d-flex justify-content-between head align-items-center'>
            <div className='logo'>
                <h1>N<span>JOB</span></h1>
            </div>
            <div className='globalSearch'>
                <form onSubmit={subSearch}>
                    <input onChange={e => {setMyq(e.target.value)}} type="text" placeholder='Search global' />
                    <button className='btn-i'><i className='fa fa-search'></i></button>
                    
                </form>
            </div>
            {(isAuthenticated && ! isStaff) && authLinks }
            {isStaff && staffLinks }
            {(! isAuthenticated && ! isStaff ) && guestLinks }
            </div>
        </Fragment>
    
    )
}
export default Header