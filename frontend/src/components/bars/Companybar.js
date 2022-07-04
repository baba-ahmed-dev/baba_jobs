import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { companysuccess } from '../slices/CompanieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Detailsuccess } from '../slices/DetailSlice';

const Companybar = () => {
    const companies = useSelector(state => state.company.datacompany)
    const Token = localStorage.getItem("token")
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        axios.get("/api/getsixjobs/", config)
        .then((res)=> {
            dispatch(companysuccess(res.data));
            
        })

    },[])
    
    const getDetail = (e) => {
        axios.get("/api/companies/"+e, config)
        .then((res)=> {
            dispatch(Detailsuccess(res.data.id));
            navigate('/detail')
            
        })
    }
    const listCompanies = companies.map((company) => {
        return(   
            <div className='col divexp' key={company.id}>
                <h6 onClick={()=>getDetail(company.id)} className='huser'>{company.companyname }</h6>
                <img className='imguser globalImg' src={company.image} alt="company logo"/>
                <h4 className='exp'>Job : {company.jobname }</h4>
                <span className='see' onClick={()=>getDetail(company.id)}>Details</span>
            </div>
        )
    })
    
    return(
        <div className='container'>
            <div className='companies'>
                <h4 className='h-list'>Companies</h4>
            </div>
            <div className='row'>{listCompanies}</div>    
        </div>
    )
}

export default Companybar