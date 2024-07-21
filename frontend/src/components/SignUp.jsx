import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@mui/icons-material/HowToReg'; import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// <Copyright sx={{ mt: 5 }} />


const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const handlefirstName = (e) => {
        setFirstName(e.target.value);
    };
    const handlelastName = (e) => {
        setLastName(e.target.value);
    };
    const handleemail = (e) => {
        setEmail(e.target.value);
    };
    const handlepasswors = (e) => {
        setPassword(e.target.value);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };
    const handleSubmit = (event) => {


        event.preventDefault();

        if (validateForm()) {
            const user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                status: status,

            };
            axios
                .post(`http://localhost:5000/user/register`, user, {

                })
                .then((res) => {
                    console.log(res.data);

                    if (res.status === 201) {
                        toast.success("User added")
                        navigate("/signin")
                        console.log("user created");
                    } else {
                        toast.success("User not created")
                        console.log("fail");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    };
    //validation
    const validateForm = () => {

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!firstName) {
            toast.error("Please enter the name");
            return false;
        }
        else if (!lastName) {
            toast.error("Please enter the name");
            return false;
        }
        else if (!email && !regex.test(email)) {
            toast.error("Please enter the no of email");
            return false;
        }
        else if (!password) {
            toast.error("Please enter the star password")
            return false;
        }


        return true;
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pb: 20

                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
                        <HowToRegIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={(e) => handlefirstName(e)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => handlelastName(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => handleemail(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => handlepasswors(e)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ minWidth: "100%" }}>
                                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                    <Select
                                        name="status"
                                        id="status"
                                        value={status}
                                        label="status"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                        <MenuItem value={"User"}>User</MenuItem>

                                    </Select>

                                </FormControl>
                            </Grid>

                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <ToastContainer />
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}