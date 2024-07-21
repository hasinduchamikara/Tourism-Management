import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reservationCtrl from "../controllers/reservation_ctrl";
import ResortCtrl from "../controllers/resorts_ctrl";
import { useNavigate } from "react-router-dom";



const ReservationForm = () => {
    //form data
    const [data, setData] = useState({ firstName: '', lastName: '', contactNo: '', email: '', adults: '', rooms: '', checkIn: '', checkOut: ''});
    const [getData, setGetdata] = useState({ });
    const [btnDisable, setBtnDisable] = useState(false);
    const navigate = useNavigate();

   

    useEffect(()=>{
        loadData()
    }, []);

    const loadData = () => {
        let urldata = window.location.pathname.split("/");
        let userid = urldata[urldata.length - 1];
        console.log(userid);
        ResortCtrl.ResortGetOne(userid).then((res)=>{
            console.log(res);
            setGetdata(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const onSubmitClick = async(e) => {
        e.preventDefault();
        setBtnDisable(true);

        try {
            if(validateForm()){
                reservationCtrl.reservationCreate(data).then((res) => {
                    console.log(res);
                    if (res.success) {
                        toast.success("Registration Success")
                    } else {
                        toast.error("Registration Failed")
                    }
                    clearForm();
                    navigate("/")
                    setBtnDisable(false);
                }).catch((err) => {
                    console.log(err);
                    setBtnDisable(false);
                })
            }
        } catch (error) {
            setBtnDisable(false);
        }
    }

    //form clearance
    const clearForm = () =>{
        setBtnDisable(false);
        setData({ firstName: '', lastName: '', contactNo: '', email: '', adults: '', rooms: '', checkIn: '', checkOut: ''});
    }

    const validateForm = () => {
        //toast.success("Data added")
        if(!data.firstName){
            toast.error("Please enter first name");
            return false;
        }
        else if(!data.lastName){
            toast.error("Please enter last name");
            return false;
        }
        else  if(!data.contactNo){
            toast.error("Please enter the contact number");
            return false;
        }
        else if(!data.email){
            toast.error("Please enter the email");
            return false;
        }
        else if(!data.adults){
            toast.error("Please enter the no of adults");
            return false;
        }
        else if(!data.rooms){
            toast.error("Please enter the no of rooms");
            return false;
        }
        else if(!data.checkIn){
            toast.error("Please select the check in date");
            return false;
        }
        else if(!data.checkOut){
            toast.error("Please select the check out date");
            return false;
        }
        return true;
    }

    return(
        <div className=''>
            
            <div className='row mx-3 my-3'>
                <div className='col-5 mx-auto'>
                    
                <div className='card mx-3 my-3 shadow-sm rounded'>
                    
                    <div className='px-4'>
                    <div style={{display:'grid'}}>
<div style={{display:'inline'}}>
    <b>{getData.name}</b>
    
    </div>
    <div style={{display:'inline'}}>
    <b>{getData.description}</b>
    </div>
    </div>
    <h3 style={{padding: 20, align: 'left'}}>Main guest information</h3>
                        <form>
                            <div className='my-3'>
                                <label htmlFor='firstName' className='form-label'> First Name</label>
                                <input type='text' className='form-control' id='firstName'
                                    value={data.firstName} onChange={(e) => {setData({ ...data, firstName: e.target.value }) }}/>
                            </div>
                            <div className='my-3'>
                                <label htmlFor='lastName' className='form-label'>Last Name</label>
                                <input type='text' className='form-control' id='lastName'
                                    value={data.lastName} onChange={(e) => {setData({ ...data, lastName: e.target.value }) }}/>
                            </div>
                            <div className='my-3'>
                                <label htmlFor='adults' className='form-label'>Number Of Adults</label>
                                <input type='number' className='form-control' id='adults'
                                    value={data.adults} onChange={(e) => {setData({ ...data, adults: e.target.value}) }}/>
                            </div>
                            <div className='my-3'>
                                <label htmlFor='rooms' className='form-label'>Number of rooms</label>
                                <input type='number' className='form-control' id='rooms'
                                    value={data.rooms} onChange={(e) => {setData({ ...data, rooms: e.target.value}) }}/>
                            </div>

                            <div className='my-3'>
                                <label htmlFor='checkIn' className='form-label'>Check In Date</label>
                                <input type='date' className='form-control' id='checkIn'
                                    value={data.checkIn} onChange={(e) => {setData({ ...data, checkIn: e.target.value }) }}/>
                            </div>
                            <div className='my-3'>
                                <label htmlFor='checkOut' className='form-label'>Check Out Date</label>
                                <input type='date' className='form-control' id='checkOut'
                                    value={data.checkOut} onChange={(e) => {setData({ ...data, checkOut: e.target.value }) }}/>
                            </div>

                            <div className='my-3'>
                                <label htmlFor='contactNo' className='form-label'>Contact Number</label>
                                <input type='text' className='form-control' id='contactNo'
                                    value={data.contactNo} onChange={(e) => {setData({ ...data, contactNo: e.target.value }) }}/>
                            </div>
                            <div className='my-3'>
                                <label htmlFor='email' className='form-label'>Email</label>
                                <input type='text' className='form-control' id='email'
                                    value={data.email} onChange={(e) => {setData({ ...data, email: e.target.value }) }}/>
                            </div>
                            <div><b>Book Now, Pay On The Visit</b></div>
                            <center>
                                <button type='submit' disabled={btnDisable} className='btn btn-primary my-3' onClick={(e) => { onSubmitClick(e)}}>RESERVE</button>
                            </center>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default ReservationForm;