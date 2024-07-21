import React from 'react'


import { Box, Divider, Grid, Typography } from "@mui/material";


export default function Footer() {
    return (
        <>
            <Grid container>
                <Grid item md={12}>
                    <Divider sx={{ borderBottom: "5px solid #063970" }} />
                    <Grid container p={5} sx={{ backgroundColor: "#FFFFFF" }}>
                        <Grid item md={8}>
                            <Typography
                                sx={{ fontSize: "20px", fontWeight: 500 }}
                            ></Typography>
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: "16px", sm: "16px", md: "24px" },
                                }}
                            >
                                <Box component="span" sx={{ color: "#063970" }}>
                                    Diving App &nbsp;
                                </Box>
                                Most of the problems in scuba diving come from ourselves.
                                <br />
                                It's another world, what the sea gives us.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} pr={4} align="center">
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: { xs: "right", sm: "right", md: "center" },
                                }}
                            >

                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "center", sm: "center", md: "center" },
                            p: 1,
                            m: 1,
                        }}
                    >
                        <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
                            © 2022 WEBSITE. All Rights Reserved.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
