import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { errorAction } from '../slices/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Profile = () => {
    const isStaff = useSelector(state => state.auth.staff)
    const isAuthenticate = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)
    const profileID = useSelector(state => state.profile.id)
    const [authprofileid, setAuthprofileid] = useState()
    const [data , setData] = useState([])
    const dispatch = useDispatch()
    const alert = useAlert()
    const Token = localStorage.getItem("token")

    const showProfile = () => {
        if(isAuthenticate){
            const myid = user.id;
            axios.get("/api/getid/"+myid)
            .then(res => {setAuthprofileid(res.data.id)})
        
        
        }
        
    }
    useEffect(()=>{
        showProfile();
        axios.get("/api/profiles/" + profileID)
        .then(res => {setData(res.data)})
    },[])
    const backImage = {
        backgroundImage : `url(${data.degone})`
    }
    
    
    const deletCount = () => {
        const token = Token;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if(token){
            config.headers['Authorization'] = `Token ${token}`
        }

        
        axios.delete('/api/profiles/' + profileID + '/', config)
        .then(res => {
            alert.show("Account deleted")
        })
       
        axios.post('/api/auth/logout',null , config)
        .then(res => {
            dispatch(errorAction())
        }).catch(err => {
           console.log(err);
        })
    }
    const experiences = () => {
        if((data.expone && data.exptwo && data.expthree) || (data.expone && data.exptwo) || (data.exptwo && data.expthree) || (data.expone && data.expthree) ){
            return(
                <div>
                    <div className='row'>
                       <h3 className='col'>Experiences </h3>
                    </div>
                    <div className='row'>
                        {data.expone ? <h4 className='experience col'>{data.expone}</h4> : ''}
                        {data.exptwo ? <h4 className='experience col'>{data.exptwo}</h4> : ''}
                        {data.expthree ? <h4 className='experience col'>{data.expthree}</h4> : ''}
                    </div>
                </div>
            )
        } else if(data.expone || data.exptwo || data.expthree){
            return(
                <div>
                    <div className='row'>
                       <h3 className='col'>Experience </h3>
                    </div>
                    <div className='d-flex justify-content-between'>
                        {data.expone ? <h4 className='exp'>{data.expone}</h4> : ''}
                        {data.exptwo ? <h4 className='exp'>{data.exptwo}</h4> : ''}
                        {data.expthree ? <h4 className='exp'>{data.expthree}</h4> : ''}
                    </div>
                </div>
            )
        }else{
            return(
                <h4>Have no experiences</h4>
            )
        }
    }
    const links = () => {
        return(
            <div>
                    <div className='edit' >
                       <Link className='bbbb' to="/editprofile" >Edit <i className='fa fa-edit'></i></Link>
                    </div>
                    <div className='jjjj' >
                       <Link onClick={deletCount} className='bbbb' to="/login" >Delete <i className='fa fa-trash'></i></Link>
                    </div>
                </div>
        )
    }
    return(
        <div className='container prof'>
            <div className='backg' style={backImage}>
            </div>
            <div className='d-flex justify-content-between align-items-center prof-info'>
                <div className=''>
                   <img className='globalImg' src={data.img} />
                   <h3 className='username'>{data.user}</h3>
                   {data.category ? <h5 className='username'>Career <span>{data.category}</span> </h5> : ''}
                   {data.birthcountry ? <h5 className='username'>Place of birth <span>{data.birthcountry}</span></h5> : ''}
                   {data.datebirth ? <h5 className='username'>Date of birth <span>{data.datebirth}</span> </h5> : ''}
                   {data.livecountry ? <h5 className='username'>Live in <span>{data.livecountry}</span> </h5> : ''}
                   {data.emailcontact ? <h5 className='username'>Email for contact <span>{data.emailcontact}</span></h5> : ''}
                   {data.numbercontact ? <h5 className='username'>Number for contact <span>{data.numbercontact}</span> </h5> : ''}
                </div>
                
                {((authprofileid && (authprofileid == profileID)) || isStaff) && links() }
                

            </div>
            {experiences()}
            <div className=''>  
                {data.description ? <div className='row'>
                    <h4 className='col'>About me</h4>
                    <p className=''>{data.description}</p>
                </div> : ''}
            </div>
            <div>
            {data.degone || data.degtwo || data.degthree  ? <div className=''>
                    <div>
                       <div className='row'>
                           <h4 className='col'>Some picture</h4>
                       </div>
                       <div className='row'>
                           <div className='col degDiv'>{data.degone ? <img className='deg' src={data.degone} />  : ''}</div>
                           <div className='col degDiv '>{data.degtwo ? <img className='deg' src={data.degtwo} /> : ''}</div>
                           <div className='col degDiv'>{data.degthree ? <img className='deg' src={data.degthree} /> : ''}</div>
                       </div>
                    </div>
                </div> : ''}
            </div>
        </div>
    )
}
export default Profile