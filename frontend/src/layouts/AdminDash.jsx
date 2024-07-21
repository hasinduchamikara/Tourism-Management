import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AdminDash = () => {

    return (
        <Box pt={10} sx={{ width: '100%' }}>

            <Typography variant="h2" gutterBottom align='center'>
                Admin Dashboard of the DivingApp
            </Typography>

            <Typography variant="h4" gutterBottom align='center'>
                This application consist of 4 main functions.
            </Typography>
            <Box pl={20} pt={8} pb={8} sx={{ width: '80%' }}>
                <Typography variant="h6" gutterBottom >
                    1) Diving Packages
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Underwater diving, as a human activity, is the practice of descending below the water's surface to interact with the environment. It is also often referred to as diving, an ambiguous term with several possible meanings, depending on context. Immersion in water and exposure to high ambient pressure have physiological effects that limit the depths and duration possible in ambient pressure diving. Humans are not physiologically and anatomically well adapted to the environmental conditions of diving, and various equipment has been developed to extend the depth and duration of human dives, and allow different types of work to be done.
                </Typography> </Box>

        </Box>
    )
}

export default AdminDash