import React, { useState, useEffect } from 'react';
//import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PackageController from "../controllers/package_contoller";
import { useNavigate, useParams } from "react-router-dom";

const UpdateResort = (props) => {

    const [data, setData] = useState({});
    const [btnDisable, setBtnDisable] = useState(false);
    const navigate = useNavigate();
    //const params = useParams();

    useEffect(() => {
        loadData()
    }, []);

    // useEffect(async() => {
    //     let res = await fetch("http://localhost:5000/api/resorts/getone/"+props.match.params.id);
    //     res = await res.json();
    //     setData(res)
    // },[]);

    const loadData = () => {
        let urldata = window.location.pathname.split("/");
        let userid = urldata[urldata.length - 1];
        console.log(userid);
        PackageController.PackageGetOne(userid).then((res) => {
            console.log(res);
            setData(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }




    const onSubmitClick = async (e) => {
        e.preventDefault();
        console.log(data);
        setBtnDisable(true);

        try {
            PackageController.PackageUpdate(data._id, data).then((res) => {
                console.log(res);
                if (res.success) {
                    toast.success("Successfully Updated")
                } else {
                    toast.error("Failed to Update")
                }
                loadData()
                setBtnDisable(false);
            }).catch((err) => {
                console.log(err);
                setBtnDisable(false);
            })
        } catch (error) {
            setBtnDisable(false);
        }
    }

    const clearForm = () => {
        setBtnDisable(false);
        setData({ name: '', description: '', price: 0, phone: '' })
    }

    return (
        <div className=''>
            <div className='mx-3 my-3 '>
                <div className=''>
                    <h3><center>Package Update Window</center></h3>
                </div>
            </div>

            <div className=''>
                <div className='row mx-3 my-3'>
                    <div className='col-5 mx-auto'>
                        <div className='card mx-3 my-3 shadow-sm rounded'>
                            <div className='px-4'>
                                <form>
                                    <div className='my-3'>
                                        <label htmlFor='name' className='form-label'>Name</label>
                                        <input type="text" className='form-control' id="name"
                                            value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='description' className='form-label'>Description</label>
                                        <input type="text" className='form-control' id="description"
                                            value={data.description} onChange={(e) => { setData({ ...data, description: e.target.value }) }} />
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='price' className='form-label'>Price</label>
                                        <input type="number" className='form-control' id="price"
                                            value={data.price} onChange={(e) => { setData({ ...data, price: e.target.value }) }} />
                                    </div>
                                    <div className='my-3'>
                                        <label htmlFor='phone' className='form-label'>Phone Number</label>
                                        <input type="number" className='form-control' id="phone"
                                            value={data.phone} onChange={(e) => { setData({ ...data, phone: e.target.value }) }} />
                                    </div>


                                    <center>
                                        <button type='submit' disabled={btnDisable} className='btn btn-primary my-3' onClick={(e) => { onSubmitClick(e) }}>Update</button>
                                        <button className='btn btn-secondary my-3 mx-3' onClick={(e) => { navigate("/packages"); }}>Show List</button>
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
export default UpdateResort;