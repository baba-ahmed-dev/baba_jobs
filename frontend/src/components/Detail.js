import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { useAlert } from 'react-alert';

const Detail = () => {
    const isStaff = useSelector(state => state.auth.staff)
    const companyID = useSelector(state => state.detail.id)
    const [data , setData] = useState([])
    const navigate = useNavigate()
    const alert = useAlert()


    useEffect(()=>{
        axios.get("/api/companies/" + companyID)
        .then(res => {setData(res.data)})
    },[])
    const backImage = {
        backgroundImage : `url(${data.image})`
    }
    
    const deletCompany = () => {
        axios.delete('/api/companies/'+ companyID)
        .then(res => {
            navigate('/')
            alert.show("Company deleted")
        })
        .catch(error => {
            alert.show("Cant't deleted")
        })
    }
    const links = () => {
        return(
            <div>
                
                <div className='edit' >
                    <Link className='bbbb' to="/editdetail">Edit <i className='fa fa-edit'></i></Link>
                </div>
                <div className='jjjj' >
                    <button onClick={deletCompany} className='bbbb btn-bb' >Delete <i className='fa fa-trash'></i></button>
                </div>
            </div>
        )
    }
    return(
        <div className='container prof'>
            <div className='divexp divImage' >
                <img className='detailImage' src={data.image} />
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='' >
                    <div className='divmargin'>
                        <h4 className='username'>Company : {data.companyname}</h4>
                        <h4 className='username'>Job : {data.jobname}</h4>
                        {data.category ? <h4 className='username'>Career : {data.category}</h4> : ''}
                        {data.country ? <h4 className='username'>Country : {data.country}</h4> : ''}
                        {data.emailcontact ? <h4 className='username'>Email : {data.emailcontact}</h4> : ''}
                        {data.numbercontact ? <h4 className='username'>Number : {data.numbercontact}</h4> : ''}
                        {data.startin ? <h4 className='username'>Start : {data.startin}</h4> : ''}
                        {data.endin ? <h4 className='username'>End : {data.endin}</h4> : ''}
                    </div>
                </div>
                { isStaff && links()}
            </div>
            <div className='divmargin'>
                <h3>Job description</h3>
                <p>{data.desc}</p>
            </div>

        </div>
    )
}
export default Detail