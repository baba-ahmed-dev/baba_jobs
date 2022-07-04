import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Profilesuccess } from '../slices/ProfileSlice';

const EditProfile = () => {
    const profileID = useSelector(state => state.profile.id)
    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()

    const [data , setData] = useState([])
    const [category ,setCategory] = useState()
    const [backProf, setBackProf] =useState(null)
    const [prof, setProf] =useState(null)
    const [birthcunt ,setBirthcunt] = useState()
    const [dbirth ,setDbirth] = useState()
    const [livecunt ,setLivecunt] = useState()
    const [email ,setEmail] = useState()
    const [number ,setNumber] = useState()
    const [expo ,setExpo] = useState()
    const [expt ,setExpt] = useState()
    const [expthree ,setExpthree] = useState()
    const [desc ,setDesc] = useState()
    const [dego, setDego] =useState(null)
    const [degt, setDegt] =useState(null)
    const [degthree, setDegthree] =useState(null)
    const fileid = useRef()
    const backid = useRef()
    const profref = useRef()
    const backref = useRef()
    const refexpone = useRef(null)
    const refexptwo = useRef(null)
    const refexpthree= useRef(null)
    const exponeid =useRef()
    const exptwoid =useRef()
    const expthreeid =useRef()
    const Token = localStorage.getItem("token")
    

    const token = Token;
    const config = {
        headers: {
            'Content-Type': 'multipart/from-data'
        }
    }
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    useEffect(()=>{
        axios.get("/api/profiles/" + profileID)
        .then(res => {setData(res.data)})
    },[])
    
    const backFunc = (e) => {
        backref.current.src = URL.createObjectURL(e.target.files[0]);
        setBackProf(e.target.files[0])
    }
    const profFunc = (e) => {
        profref.current.src = URL.createObjectURL(e.target.files[0]);
        setProf(e.target.files[0])
    }
    const degoFunc = (e) => {
        refexpone.current.src = URL.createObjectURL(e.target.files[0]);
        setDego(e.target.files[0])
        
    }
    const degtFunc = (e) => {
        refexptwo.current.src = URL.createObjectURL(e.target.files[0]);
        setDegt(e.target.files[0]);
        
    }
    const degthreeFunc = (e) => {
        refexpthree.current.src = URL.createObjectURL(e.target.files[0]);
        setDegthree(e.target.files[0])
        
    }

    const subFunc = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("user", data.user)
        category && formData.append("category", category)
        backProf && formData.append("backProf", backProf )
        prof && formData.append("img",prof)
        birthcunt && formData.append("birthcountry", birthcunt)
        dbirth && formData.append("datebirth", dbirth)
        livecunt && formData.append("livecountry", livecunt)
        email && formData.append("emailcontact", email)
        number && formData.append("numbercontact", number)
        expo && formData.append("expone", expo)
        expt && formData.append("exptwo", expt)
        expthree && formData.append("expthree", expthree)
        desc && formData.append("description", desc)
        dego && formData.append("degone", dego)
        degt && formData.append("degtwo", degt)
        degthree && formData.append("degthree", degthree)
       
        const userid = data.id;
        
        axios.put('/api/profiles/' + userid + "/"  ,formData)
        .then((res) => {
            dispatch(Profilesuccess(res.data.id))
            alert.show("Profile Edited")
            navigate('/profile')
        })
        .catch((err) => {
            alert.show("There is an error try again")
        })

        

        
    }
    return(
        <div className='container prof'>
            <form onSubmit={subFunc} encType="multipart/form-data">
                <div className='backg' >
                   <img ref={backref} className='backgroundImage' src={data.degone} />
                   <i onClick={e => backid.current.click()} className='fa fa-edit editimgback' style={{color:"blue"}}></i>
                   <input type="file" ref={backid} style={{display:"none"}} accept="image/*" onChange={backFunc} />
                </div>
                <div className='d-flex justify-content-between align-items-center prof-info'>
                    <div className=''>
                        <img className='globalImg' ref={profref} src={data.img} />
                        <i onClick={e => fileid.current.click()} className='fa fa-edit' style={{color:"blue"}}></i>
                        <input type="file" ref={fileid} style={{display:"none"}} accept="image/*" onChange={profFunc} />
                        <h3 className='username'>{data.user}</h3>
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
                            Place of birth <span>
                                   <input type="text" onChange={e => {setBirthcunt(e.target.value)}} value={birthcunt || ''} placeholder={data.birthcountry ? data.birthcountry : 'Enter birth country'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                            Date of birth <span>
                                   <input type="date" onChange={e => {setDbirth(e.target.value)}} value={dbirth || ''} placeholder={data.datebirth ? data.datebirth : 'Enter birth date'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                            Live country <span>
                                   <input type="text" onChange={e => {setLivecunt(e.target.value)}} value={livecunt || ''} placeholder={data.livecountry ? data.livecountry : 'Enter Live country'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                            Email <span>
                                   <input type="email" onChange={e => {setEmail(e.target.value)}} value={email || ''} placeholder={data.emailcontact ? data.emailcontact : 'Enter email'} />
                                </span>
                        </h5>
                        <h5 className='username'>
                            Number <span>
                                   <input type="text" onChange={e => {setNumber(e.target.value)}} value={number || ''} placeholder={data.numbercontact ? data.numbercontact : 'Enter Number'} />
                                </span>
                        </h5>
                    </div>

                    

                </div>
                <div>
                <div className='row'>
                    <h3 className='col'>Experiences </h3>
                </div>
                <div className='row'>
                    <input className='col' type="text" onChange={e => {setExpo(e.target.value)}} value={expo || ''} placeholder={data.expone ? data.expone : 'enter experience1'} />
                    <input className='col' type="text" onChange={e => {setExpt(e.target.value)}} value={expt || ''} placeholder={data.exptwo ? data.exptwo : 'enter experience2'} />
                    <input className='col' type="text" onChange={e => {setExpthree(e.target.value)}} value={expthree || ''} placeholder={data.expthree ? data.expthree : 'enter experience3'} />
                </div>
                </div>
                
                <div >
                    <div className='row'>
                        <h4 className='col'>About me</h4>
                    </div>
                    <div className='row'>
                        <textarea className='col' onChange={e => {setDesc(e.target.value)}} value={desc || ''} placeholder={data.description ? data.description : 'Enter detail description'} />
                    </div>
                </div>
            
            
            <div>
            {data.degone || data.degtwo || data.degthree  ? <div className=''>
                    <div>
                       <div className='row'>
                           <h4 className='col'>Some picture</h4>
                       </div>
                       <div className='row'>
                            <div className='col'>
                            
                                <img ref={refexpone} className='deg' src={data.degone} /> 
                                <i onClick={e => exponeid.current.click()} className='fa fa-edit editimgback' style={{color:"blue"}}></i>
                                <input type="file" ref={exponeid} style={{display:"none"}} accept="image/*" onChange={degoFunc} />
                            
                            </div>
                            <div className='col'>
                                <img ref={refexptwo} className='deg' src={data.degtwo} />
                                <i onClick={e => exptwoid.current.click()} className='fa fa-edit editimgback' style={{color:"blue"}}></i>
                                <input type="file" ref={exptwoid} style={{display:"none"}} accept="image/*" onChange={degtFunc} />
                            </div>
                            <div className='col'>
                                <img ref={refexpthree} className='deg' src={data.degthree} />
                                <i onClick={e => expthreeid.current.click()} className='fa fa-edit editimgback' style={{color:"blue"}}></i>
                                <input type="file" ref={expthreeid} style={{display:"none"}} accept="image/*" onChange={degthreeFunc} />
                            </div>
                       </div>
                    </div>
                </div> : ''}
            </div>
            <input type="submit" value="Save" />
            </form>
        </div>
    )
}
export default EditProfile