
import React from 'react'

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import TouchAppIcon from '@mui/icons-material/TouchApp';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const Carditem = ({ item }) => {


    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div>
            <Card sx={{ maxWidth: 400 }}>
                <CardHeader

                    title={item.name}

                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <DescriptionIcon />  {item.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <TouchAppIcon /> to view the price
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="view price"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>
                            <AttachMoneyIcon /> Rs.{item.price}.00
                        </Typography>
                        <Typography>
                            <LocalPhoneIcon />   {item.phone}
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card></div>
    )
}

export default Carditem