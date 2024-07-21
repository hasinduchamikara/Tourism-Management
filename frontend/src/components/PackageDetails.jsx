import React, { useEffect, useState } from 'react'
import { Card, Container, Grid } from '@material-ui/core';
import axios from 'axios';
import Carditem from './Card';
import { Typography } from '@mui/material';


export const PackageDetails = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get("http://localhost:5000/api/packages/all");
                setData(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);


    return (
        <Grid >
            {loading && <div>Loading</div>}
            {!loading && (
                <Grid >

                    <Typography variant="h4" gutterBottom align='center'>
                        Package Details
                    </Typography>
                </Grid>
            )}
            <Container>
                <Grid container spacing={5}>
                    {data.map(item => (
                        <Grid item key={item.id} >
                            <Carditem item={item} />
                        </Grid>
                    ))}
                </Grid></Container>



        </Grid>
    )
}

