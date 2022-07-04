import React, { useEffect } from 'react';
import { seekersuccess } from '../slices/SeekersSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Profilesuccess } from '../slices/ProfileSlice';
import { useNavigate } from 'react-router-dom';


const Seekerbar = () => {
    const seekers = useSelector(state => state.seeker.dataseeker)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Token = localStorage.getItem("token")

    const token = Token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }
    useEffect(()=>{
        axios.get("/api/getsixprofiles/", config)
        .then(res => {
            dispatch(seekersuccess(res.data));
        })
    },[])

    const profileUser = (e) => {
        dispatch(Profilesuccess(e));
        navigate("/profile")

    }
    const users = seekers.map((auser) => {
        return(
            <div className='col divexp' key={auser.id}>
                <h6 className='userr huser' onClick={()=>profileUser(auser.id)}>{auser.user}</h6>
                <img className='globalImg userr imguser' onClick={()=>profileUser(auser.id)} src={auser.img} alt="user profile" />
                <div>
                        {auser.category ? <h4 className='exp'>Career : {auser.category}</h4> : ''}
                </div>
                <span className='see userr' onClick={()=>profileUser(auser.id)}>see profile</span>
            </div>
        )
    })
    return(
        <div className='container'>
            <div className='seeker'>
                <h4 className='h-list'>Job seekers</h4>
            </div>
            <div className='row'>{users}</div>
        </div>
    )
}

export default Seekerbar