import React, { useEffect } from 'react'
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';



const Header = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState();
    const [index, setindex] = useState(0);

    useEffect(() => {

        switch (window.location.pathname) {
            case "/signin":
                setindex(1)
                break;
            case "/signup":
                setindex(2)
                break;
            case "/":
                setindex(3)
                break;


            default:
                break;
        }
    }, [])

    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    const userLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate('/signin ')
    }

    console.log("user", role);



    return (
        <div>

            <AppBar sx={{ background: '#063970' }} position="sticky">
                <Toolbar >
                    <ScubaDivingIcon fontSize="large" />
                    <Typography >{'\u00A0'}{'\u00A0'} Diving App{'\u00A0'}{'\u00A0'}</Typography>
                    <Tabs sx={{ marginRight: 'auto', "& button:Mui-selected": { backgroundColor: "red" } }} textColor="inherit" value={value} onChange={(e, value) => setValue(value)} indicatorColor='secondary'>

                        {role === "User" ? <></> :
                            <>
                                {(index === 1 || index === 2 || index === 3) ? <></> : <> <Tab label="Liveaboards" href="/liveBoardView"  />
                                    <Tab label="Diving Resorts" href="/resorts" />
                                    <Tab label="Diving Packages" href="/packages" />
                                    <Tab label="Snorkeling" /></>}


                            </>
                        }




                    </Tabs>

                    {token ? <Button variant='contained' sx={{ marginLeft: 'auto' }} onClick={() => { userLogout() }}>
                        Logout
                    </Button> : <>
                        {index === 1 ?
                            <Button variant='contained' sx={{ marginLeft: '10px ' }} href="/signup">Register</Button>

                            :
                            <Button variant='contained' sx={{ marginLeft: 'auto' }} href="/signin">Login</Button>
                        }


                    </>}



                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Header