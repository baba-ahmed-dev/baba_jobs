import React, { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios'
import { useAlert } from 'react-alert';
import { ssearchGlobalC , ssearchGlobalJ, ssearchSeekers, ssearchSeekersC } from '../slices/SearchSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Searchjob = () => {
    const alert = useAlert()
    const [showj,  setShowj] = useState(true)
    const [shows,  setShows] = useState(false)
    const [career , setCareer] = useState()
    const [country , setCountry] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const back = {
        backgroundColor:`#0ff`,
    }
    
    const searchJ = () => {
        setShowj(false);
        setShows(true);
    }
    const searchS =() => {
        setShowj(true);
        setShows(false);
    }

    const jobSearch = (e) => {
        e.preventDefault()
        if(career && country){
            axios.get('/api/getjobs/'+career+'/'+country)
            .then(res => {dispatch(ssearchGlobalC(res.data))})
            navigate('/search')
        }else if(career) {
            axios.get('/api/getjobs/'+career)
            .then(res => {dispatch(ssearchGlobalJ(res.data))})
            navigate('/search')
        } else {
            alert.show("selected career")
        }
    }
    const seekerSearch = (e) => {
        e.preventDefault()
        if(career && country){
            axios.get('/api/getseekers/'+career+'/'+country)
            .then(res => {dispatch(ssearchSeekersC(res.data))})
            navigate('/search')
        }else if(career) {
            axios.get('/api/getseekers/'+career)
            .then(res => {dispatch(ssearchSeekers(res.data))})
            navigate('/search')
        } else {
            alert.show("selected career")
        }
    }
    return(
        <div className='container' style={back}>
           <div className='serchjob'>
           <div className='info' >
                
            </div>
            <div>
                <div style={{display: showj ? 'block' : 'none'}} >
                <form onSubmit={jobSearch}>
                    <h5 className='hsearch'>Search to job depending on spesific career </h5>
                    <div className='search'>
                        <select name='select career' onChange={e => {setCareer(e.target.value)}}>
                            <option value="">select career</option>
                            <option value="computer">computer</option>
                            <option value="marine">marine</option>
                            <option value="cenergy">energy</option>
                            <option value="health">health</option>
                            <option value="other">other</option>
                        </select>
                        <input onChange={e => {setCountry(e.target.value)}} className='right-input' type="text" placeholder='Enter location optional' />
                        <button className='btn-s-g'><i className='fa fa-search'></i></button>
                        </div>
                    <h5 className='hsearch'>Loocking for job seekers? <span onClick={searchJ} className='cur' style={{color: "#ffc107"}}>click here</span></h5>
                </form>
                </div>
                <div style={{display: shows ? 'block' : 'none'}}>
                <form onSubmit={seekerSearch}>
                    <h5 className='hsearch'>Search to seekers job depending on spesific career </h5>
                    <div className='search'>
                        <select name='select career' onChange={e => {setCareer(e.target.value)}}>
                            <option value="">select career</option>
                            <option value="computer">computer</option>
                            <option value="marine">marine</option>
                            <option value="cenergy">energy</option>
                            <option value="health">health</option>
                            <option value="other">other</option>
                        </select>
                        <input onChange={e => {setCountry(e.target.value)}} className='right-input' type="text" placeholder='Enter location optional' />
                        <button className='btn-s-g'><i className='fa fa-search'></i></button>
                    </div>
                    <h5 className='hsearch'>Loocking for job? <span  className='cur' onClick={searchS} style={{color: "#ffc107"}}>click here</span></h5>
                </form>
                </div>
                
            </div>
           </div>
        </div>
    )
}
export default Searchjob