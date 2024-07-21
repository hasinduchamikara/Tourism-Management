import React, { useState, useEffect } from 'react';
//import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import PackageController from "../controllers/package_contoller";






const Packages = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadData()

    }, []);


    const loadData = () => {
        PackageController.PackageGet().then((res) => {
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
            PackageController.PackageDelete(data._id).then((res) => {
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
                    <h3><center>Package List</center></h3>
                </div>
            </div>

            <div className=''>
                <div className='row mx-3 my-3'>
                    <div className='col-8 mx-auto'>
                        <div className='card mx-3 my-3 shadow-sm rounded'>
                            <MaterialTable

                                title="Package Details"
                                columns={[

                                    { title: 'Name', field: 'name' },
                                    { title: 'Description', field: 'description' },
                                    { title: 'Price', field: 'price' }, { title: 'Phone Number', field: 'phone' },

                                ]}
                                data={data}
                                actions={[
                                    {
                                        icon: 'delete',
                                        tooltip: 'Delete Package',
                                        onClick: (event, rowData) => { onDelete(event, rowData) }
                                    },
                                    {
                                        icon: 'update',
                                        tooltip: 'Update Package',
                                        onClick: (event, rowData) => { navigate(`/packages/updatepackage/${rowData._id}`) }

                                    },
                                    {
                                        icon: 'add_box',
                                        tooltip: "Add New",
                                        position: "toolbar",
                                        onClick: () => navigate("/addpackage")
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
export default Packages;