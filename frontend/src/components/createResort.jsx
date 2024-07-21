import React, { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResortCtrl from "../controllers/resorts_ctrl";
import { renderMatches, useNavigate } from "react-router-dom";

import { FilePond, File, registerPlugin } from 'react-filepond'
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

const CreateResort = () => {
    //form data
    const [data, setData] = useState({ name: '', location: '', rooms: 0, stars: 0, description: '', files: [] });
    const [btnDisable, setBtnDisable] = useState(false);
    const navigate = useNavigate();

    

    const onSubmitClick = async (e) => {
        e.preventDefault();
        // setBtnDisable(true);

        try {
            ResortCtrl.ResortCreate(data.files,data).then((res) => {
                if (res.success) {
                    toast.success("Registration Success")
                } else {
                    toast.error("Registration Failed")
                }
                clearForm()
                setBtnDisable(false);
            }).catch((err) => {
                console.log(err);
                setBtnDisable(false);
            })
        } catch (error) {
            setBtnDisable(false);

        }
    }

    //form clearance
    const clearForm = () => {
        setBtnDisable(false);
        setData({ name: '', location: '', rooms: 0, stars: 0, description: '', files: [] })
    }

    //validation
    const validateForm = () => {
        //toast.success("Data added")
        if (!data.name) {
            toast.error("Please enter the name");
            return false;
        }
        else if (!data.location) {
            toast.error("Please enter the location");
            return false;
        }
        else if (!data.rooms) {
            toast.error("Please enter the no of rooms");
            return false;
        }
        else if (!data.stars) {
            toast.error("Please enter the star rating")
            return false;
        }
        else if (!data.description) {
            toast.error("Please enter the description");
            return false;
        }
        else if (!data.files) {
            toast.error("Please enter the images");
            return false;
        }

        return true;
    }

    

    return (
        <div className=''>
            <div className='mx-3 my-3 '>
                <div className=''>
                    <h3><center>Resort Create Window</center></h3>
                </div>
            </div>

            <div className=''>
                <div className='row mx-3 my-3'>
                    <div className='col-5 mx-auto'>
                        <div className='card mx-3 my-3 shadow-sm rounded'>
                            <div className='px-4'>
                                <form action="/" method="POST" encType="multipart/form-data">
                                    <div className='my-3'>
                                        <label htmlFor='name' className='form-label'>Name</label>
                                        <input type="text" className='form-control' id="name"
                                            value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='location' className='form-label'>Location</label>
                                        <input type="text" className='form-control' id="location"
                                            value={data.location} onChange={(e) => { setData({ ...data, location: e.target.value }) }} />
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='rooms' className='form-label'>No of Rooms</label>
                                        <input type="number" className='form-control' id="rooms"
                                            value={data.rooms} onChange={(e) => { setData({ ...data, rooms: e.target.value }) }} />
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='stars' className='form-label'>Stars</label>
                                        <input type="number" className='form-control' id="stars"
                                            value={data.stars} onChange={(e) => { setData({ ...data, stars: e.target.value }) }} />
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='description' className='form-label'>Description</label>
                                        <input type="text" className='form-control' id="description"
                                            value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} />
                                    </div>

                                    <div className='my-3'>
                                    <label htmlFor='files' className='form-label'>Image upload</label>
                                    <FilePond
                                        files={data.files}
                                        allowMultiple={true}
                                        onupdatefiles={ (fileItems) => {
                                            setData({...data, files : fileItems.map((i) => i.file) })
                                        }}>
                                    </FilePond>
                                            </div>

                                    <center>
                                        <button type='submit' disabled={btnDisable} className='btn btn-primary my-3' onClick={(e) => { onSubmitClick(e) }}>CREATE</button>
                                        <button className='btn btn-secondary my-3 mx-3' onClick={(e) => { navigate("/resorts"); }}>Show List</button>
                                    </center>
                                    <ToastContainer />
                                </form>
                                       
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
    
};
export default CreateResort;