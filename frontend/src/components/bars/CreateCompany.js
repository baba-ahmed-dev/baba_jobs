import React,{useState} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const CreateCompany = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const [companyname,  setCompanyname] = useState()
    const [category,  setCategory] = useState()
    const [email,  setEmail] = useState()
    const [jobname,  setJobname] = useState()
    const [country , setCountry] = useState()
    const [jobdescription,  setJobdescription] = useState()
    const [number,  setNumber] = useState()
    const [logo,  setLogo] = useState(null)
    const [startin,  setStartin] = useState()
    const [endin,  setEndin] = useState()
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

    const onsubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        companyname && formData.append("companyname",companyname);
        category && formData.append("category",category);
        jobname && formData.append("jobname",jobname);
        country && formData.append("country", country);
        logo && formData.append("image",logo);
        jobdescription && formData.append("desc",jobdescription);
        email && formData.append("emailcontact",email);
        number && formData.append("numbercontact",number);
        startin && formData.append("startin",startin);
        endin && formData.append("endin",endin);
        
        

        axios.post("/api/companies/" , formData)
        .then(res => {
           navigate('/')
           alert.show("Company Added Successfully")
        })
       
    }

    return(
        <div className='col-md-6 m-auto'>
        <div className='card card-body login-mr' style={{position: 'static'}}>
            <h2 className='text-center'>Create Company</h2>
            <form onSubmit={onsubmit}>
                <div className='form-group'>
                    <label>Company name</label>
                    <input type='text' className="form-control" name="companyname" onChange={(e)=>setCompanyname(e.target.value)}  value={companyname || '' }/>
                </div>
                <div className='form-group'>
                    <label>Career</label>
                    <select className="form-control" name={category} value={category} onChange={e => {setCategory(e.target.value)}}>
                            <option value="civil enginners">civil enginners</option>
                            <option value="computer">computer</option>
                            <option value="marine">marine</option>
                            <option value="cenergy">energy</option>
                            <option value="health">health</option>
                            <option value="other">other</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Job name</label>
                    <input type='text' className="form-control" name="jobname" onChange={(e)=>setJobname(e.target.value)}  value={jobname || '' }/>
                </div>
                <div className='form-group'>
                    <label>Job description</label>
                    <textarea className="form-control" name="jobdescription" onChange={(e)=>setJobdescription(e.target.value)}  value={jobdescription || '' }/>
                </div>
                <div>
                    <label>Country</label>
                    <input className="form-control" type="text" onChange={e => {setCountry(e.target.value)}} value={country || ''}  />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)} value={email || ''} />
                </div>
                <div className='form-group'>
                    <label>Phone Number</label>
                    <input type='text' className="form-control" name="number" onChange={(e)=>setNumber(e.target.value)} value={number || ''} />
                </div>
                <div className='form-group'>
                    <label>Company logo</label>
                    <input type='file' className="form-control" name="logo" onChange={(e)=>setLogo(e.target.files[0])}  />
                </div>
                <div className='form-group'>
                    <label>Start in</label>
                    <input type='date' className="form-control" name="startin" onChange={(e)=>setStartin(e.target.value)} value={startin || ''} />
                </div>
                <div className='form-group'>
                    <label>End in</label>
                    <input type='date' className="form-control" name="endin" onChange={(e)=>setEndin(e.target.value)} value={endin || ''} />
                </div>
                <div className='form-group'>
                    <button type="submit" className='btn btn-primary'>Create</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default CreateCompany;