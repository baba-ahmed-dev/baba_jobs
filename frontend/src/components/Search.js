import React, { useEffect } from "react";
import {useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { enableMapSet } from "immer";
import { useNavigate } from "react-router-dom";
import { Detailsuccess } from "./slices/DetailSlice";
import { Profilesuccess } from "./slices/ProfileSlice";
import axios from "axios";


const Search = () => {
    const resultGlobalC = useSelector(state => state.search.searchGlobalC);
    const resultGlobalJ = useSelector(state => state.search.searchGlobalJ);
    const resultSeekers = useSelector(state => state.search.searchSeekers);
    const resultSeekersC = useSelector(state => state.search.searchSeekersC);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const globalC = resultGlobalC.map(job => {
        return(
            <div className='col divexp' key={job.id}>
                <h6 onClick={()=>getDetail(job.id)} className='huser'>{job.companyname }</h6>
                <img className='imguser globalImg' src={job.image} alt="company logo"/>
                <h4 className='exp'>Job : {job.jobname }</h4>
                <span className='see' onClick={()=>getDetail(job.id)}>Details</span>
            </div>
        )
    })
    const globalJ = resultGlobalJ.map(job => {
        return(
            <div className='col divexp' key={job.id}>
                <h6 onClick={()=>getDetail(job.id)} className='huser'>{job.companyname }</h6>
                <img className='imguser globalImg' src={job.image} alt="company logo"/>
                <h4 className='exp'>Job : {job.jobname }</h4>
                <span className='see' onClick={()=>getDetail(job.id)}>Details</span>
            </div>
        )
    })
    const getDetail = (e) => {
        axios.get("/api/companies/"+e)
        .then((res)=> {
            dispatch(Detailsuccess(res.data.id));
            navigate('/detail')
            
        })
    }


    const profileUser = (e) => {
        dispatch(Profilesuccess(e));
        navigate("/profile")

    }
    const seekers = resultSeekers.map((seeker) => {
        return(
            <div className='col divexp' key={seeker.id}>
                <h6 className='userr huser' onClick={()=>profileUser(seeker.id)}>{seeker.user}</h6>
                <img className='globalImg userr imguser' onClick={()=>profileUser(seeker.id)} src={seeker.img} alt="user profile" />
                <div>
                        {seeker.category ? <h4 className='exp'>Career : {seeker.category}</h4> : ''}
                </div>
                <span className='see userr' onClick={()=>profileUser(seeker.id)}>see profile</span>
            </div>
        )
    })
    const seekersC = resultSeekersC.map((seeker) => {
        return(
            <div className='col divexp' key={seeker.id}>
                <h6 className='userr huser' onClick={()=>profileUser(seeker.id)}>{seeker.user}</h6>
                <img className='globalImg userr imguser' onClick={()=>profileUser(seeker.id)} src={seeker.img} alt="user profile" />
                <div>
                        {seeker.category ? <h4 className='exp'>Career : {seeker.category}</h4> : ''}
                </div>
                <span className='see userr' onClick={()=>profileUser(seeker.id)}>see profile</span>
            </div>
        )
    })
    return(
        <div className='container mr-top'>
        <div className='companies'>
            {(resultGlobalC.length > 0 || resultGlobalJ.length > 0 || resultSeekers.length > 0 || resultSeekersC.length > 0) ? <h4 className='h-list'>Results</h4> : <h4 className='h-list'>No results</h4> }
        </div>
        <div className='row'>
        {resultGlobalC.length > 0 && globalC}
        {resultGlobalJ.length > 0 && globalJ}
        {resultSeekers.length > 0 && seekers}
        {resultSeekersC.length > 0 && seekersC}
        </div>    
    </div>
    )
}

export default Search;
