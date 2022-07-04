import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Detailsuccess } from '../slices/DetailSlice';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const EditDetail = () => {
    const companyID = useSelector(state => state.detail.id)
    const [data , setData] = useState([])
    const [backProf, setBackProf] =useState(null)
    const [company, setCompany] =useState()
    const [category ,setCategory] = useState()
    const [job ,setJob] = useState()
    const [country , setCountry] = useState()
    const [email ,setEmail] = useState()
    const [number ,setNumber] = useState()
    const [startin ,setStartin] = useState()
    const [endin ,setEndin] = useState()
    const [desc ,setDesc] = useState()
    const backref = useRef()
    const backid = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()


    

    useEffect(()=>{
        axios.get("/api/companies/" + companyID)
        .then(res => {setData(res.data)})
    },[])
    
    
    const backFunc = (e) => {
        backref.current.src = URL.createObjectURL(e.target.files[0]);
        setBackProf(e.target.files[0])
    }

    const subFunc = (e) => {
        e.preventDefault()
        const formData = new FormData()
        company && formData.append("companyname", company)
        category && formData.append("category", category)
        backProf && formData.append("image", backProf )
        job && formData.append("jobname", job)
        country && formData.append("country", country)
        email && formData.append("emailcontact", email)
        number && formData.append("numbercontact", number)
        desc && formData.append("desc", desc)
        startin && formData.append("startin", startin)
        endin && formData.append("endin", endin)
       
        const userid = data.id;
        
        axios.put('/api/companies/' + userid + "/"  ,formData)
        .then((res) => {
            dispatch(Detailsuccess(res.data.id))
            alert.show("Company Edited")
            navigate('/detail')
        })
        .catch((err) => {
            alert.show("There is an error try again")
        })

        

        
    }
    
    return(
        <div className='container prof'>
            <form onSubmit={subFunc}>
            <div className='divexp divImage' >
                <img ref={backref} className='detailImage' src={data.image} />
                <i onClick={e => backid.current.click()} className='fa fa-edit editimgback' style={{color:"#fff"}}></i>
                <input type="file" ref={backid} style={{display:"none"}} accept="image/*" onChange={backFunc} />
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='' >
                    <div className='divmargin'>
                        <h5 className='username'>
                            Company <span>
                                   <input type="text" onChange={e => {setCompany(e.target.value)}} value={company || ''} placeholder={data.companyname ? data.companyname : 'Enter company name'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                            Career
                                   
                                <select name={category} value={category} onChange={e => {setCategory(e.target.value)}}>
                                    <option value="civil enginners">civil enginners</option>
                                    <option value="computer">computer</option>
                                    <option value="marine">marine</option>
                                    <option value="cenergy">energy</option>
                                    <option value="health">health</option>
                                    <option value="other">other</option>
                                </select>
                        </h5>
                        <h5 className='username'>
                            Job <span>
                                   <input type="text" onChange={e => {setJob(e.target.value)}} value={job || ''} placeholder={data.jobname ? data.jobname : 'Enter job name'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                            Country <span>
                                   <input type="text" onChange={e => {setCountry(e.target.value)}} value={country || ''} placeholder={data.country ? data.country : 'Enter country name'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                           Email <span>
                                   <input type="text" onChange={e => {setEmail(e.target.value)}} value={email || ''} placeholder={data.emailcontact ? data.emailcontact : 'Enter email'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                           Number <span>
                                   <input type="text" onChange={e => {setNumber(e.target.value)}} value={number || ''} placeholder={data.numbercontact ? data.numbercontact : 'Enter Number'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                           Start in <span>
                                   <input type="date" onChange={e => {setStartin(e.target.value)}} value={startin || ''} placeholder={data.startin ? data.startin : 'Enter start date'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                           End in <span>
                                   <input type="date" onChange={e => {setEndin(e.target.value)}} value={endin || ''} placeholder={data.endin ? data.endin : 'Enter End date'} />
                                </span>
                        </h5>
                    </div>
                </div>
                <div className='edit' >
                    <input className='bbbb' type="submit" value="Save" style={{backgroundColor:"#007bff"}} />
                </div>
                
            </div>
            <div className='divmargin row'>
                <h3>Job description</h3>
                <textarea className='col' onChange={e => {setDesc(e.target.value)}} value={desc || ''} placeholder={data.desc ? data.desc : 'Enter detail description'} />
            </div>
            </form>
        </div>
    )
}
export default EditDetail