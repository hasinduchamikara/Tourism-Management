import { Button } from '@material-ui/core';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


const Home = () => {


    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Box pt={10} sx={{ width: '100%' }}>
                    <Typography variant="h2" gutterBottom align='center'>
                        Welcome to the DivingApp
                    </Typography>
                </Box>
                <Container fixed>

                    <Box m={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ bgcolor: '#f2f2f2', height: '100%' }} >
                        <Box pl={20} pt={8} pb={8} sx={{ width: '80%' }}>
                            <Typography variant="h6" gutterBottom >
                                1) Diving Packages
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Underwater diving, as a human activity, is the practice of descending below the water's surface to interact with the environment.
                            </Typography>  <Typography variant="h6" gutterBottom >
                                Click the Button to Explore the Packages
                            </Typography></Box>
                        <Button style={{ backgroundColor: '#03a1fc', color: '#FFFFFF' }} href="/packagedetails"> Package Details</Button>
                    </Box>
                    
                </Container>
                <Container fixed>

                    <Box m={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ bgcolor: '#f2f2f2', height: '100%' }} >
                        <Box pl={20} pt={8} pb={8} sx={{ width: '80%' }}>
                            <Typography variant="h6" gutterBottom >
                                2) Liveaboards
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                            Liveaboard diving is an experience unlike any other.
                             </Typography>  <Typography variant="h6" gutterBottom >
                                Click the Button to Explore the Liveaboards
                            </Typography></Box>
                        <Button style={{ backgroundColor: '#03a1fc', color: '#FFFFFF' }}  href="/LiveBoardCusView"> Liveaboards</Button>
                    </Box>
                    
                </Container>

                <Container fixed>

                    <Box m={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ bgcolor: '#f2f2f2', height: '100%' }} >
                        <Box pl={20} pt={8} pb={8} sx={{ width: '80%' }}>
                            <Typography variant="h6" gutterBottom >
                                3) Diving Resorts
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                            Diving resort is live in luxury.
                             </Typography>  <Typography variant="h6" gutterBottom >
                                Click the Button to view the resorts.
                            </Typography></Box>
                        <Button style={{ backgroundColor: '#03a1fc', color: '#FFFFFF' }}  href="/view-all-resorts"> Resorts</Button>
                    </Box>
                    
                </Container>

            </React.Fragment>


        </>


    )
}

export default Home