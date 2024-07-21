import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import MaterialTable from 'material-table';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import 'react-toastify/dist/ReactToastify.css';
import ResortCtrl from "../controllers/resorts_ctrl";
import { height } from '@mui/system';

const ViewAllResorts = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadData()
        console.log(data);
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
                        {data.map((dat)=>{
                            return(
                                <Card sx={{ maxWidth: 450 }} className='m-2'>
                            {/* <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            /> */}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {dat.name}
                                </Typography>
                                {/* {"http://localhost:5000/" + dat.images[0]} */}
                                <img src={"http://localhost:5000/" + dat.images[0]} style={{width: "400px", height: "300px"}} />
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=>navigate(`/resort-view/${dat._id}`)}>Book Now</Button>
                            </CardActions>
                        </Card>
                            )
                        })}
                        
                </div>
                        <ToastContainer />
            </div>

        </div>
    );
};
export default ViewAllResorts;