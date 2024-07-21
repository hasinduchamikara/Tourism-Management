import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reservationCtrl from "../controllers/reservation_ctrl";
import ResortCtrl from "../controllers/resorts_ctrl";
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ViewResort = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [btnDisable, setBtnDisable] = useState(false);

    useEffect(() => {
        loadData()
        console.log(data);
    }, []);

    const loadData = () => {
        let urldata = window.location.pathname.split("/");
        let userid = urldata[urldata.length - 1];
        console.log(userid);
        ResortCtrl.ResortGetOne(userid).then((res)=>{
            console.log(res);
            setData(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className=''>
                <Card sx={{ maxWidth: 500 }} className='mx-auto mt-5'>
                <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {data.name}
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary">
                                {data.description}
                                </Typography>
                            </CardContent>
                            
                                <Button type='submit' disabled={btnDisable} className="mx-3 my-3" 
                                    style={{color: "white", backgroundColor: 'blue', cursor: 'pointer'}} onClick={()=>navigate(`/book-reservation/${data._id}`)}>Proceed To Reserve</Button>
                            
                
                
                

               

            
        </Card>
           
        </div>
    );

}
export default ViewResort;