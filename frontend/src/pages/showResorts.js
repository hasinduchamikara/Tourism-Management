import React, { useState, useEffect } from 'react';
//import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import ResortCtrl from "../controllers/resorts_ctrl";

function ShowResort() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadData()
    }, []);


    const loadData = () => {
        ResortCtrl.ResortGet().then((res) => {
            console.log(res);
            setData(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const onDelete = async (e, data) => {
        e.preventDefault();
        console.log(data);

        try {
            ResortCtrl.ResortDelete(data._id).then((res) => {
                console.log(res);
                if (res.success) {
                    toast.success("Successfully Deleted")
                } else {
                    toast.error("Failed to Delete")
                }
                loadData()
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {

        }
    }


    return (
        <div className=''>
            <div className='mx-3 my-3 '>
                <div className=''>
                    <h3><center>Resort List</center></h3>
                </div>
            </div>

            <div className=''>
                <div className='row mx-3 my-3'>
                    <div className='col-8 mx-auto'>
                        <div className='card mx-3 my-3 shadow-sm rounded'>
                            <MaterialTable
                                title="Resort Details"
                                columns={[
                                    { title: 'Name', field: 'name' },
                                    { title: 'Location', field: 'location' },
                                    { title: 'Rooms', field: 'rooms', type: 'numeric' },
                                    { title: 'Stars', field: 'stars', type: 'numeric' },
                                    { title: 'Description', field: 'description' },
                                ]}
                                data={data}
                                actions={[
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Resort',
                                        onClick: (event, rowData) => { onDelete(event, rowData) }
                                    },
                                    {
                                        icon: 'update',
                                        tooltip: 'Update Resort',
                                        onClick: (event, rowData) => { navigate(`/update-resorts/${rowData._id}`) }
                                        
                                    },
                                    {
                                        icon: 'add_box',
                                        tooltip: "Add New",
                                        position: "toolbar",
                                        onClick: () => navigate("/create-resorts")
                                    }
                                ]}
                                options={{
                                    actionsColumnIndex: -1,
                                    exportButton: true,
                                    search: true
                                }}
                            />
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ShowResort;