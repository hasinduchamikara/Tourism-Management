import React, { useState, useRef, Component, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Dropzone from "react-dropzone";
import axios from "axios";
// import "./addbook.css";
import { API_URL } from "../utils/constants";
import dummy from "../images/dummy.jpg";
import { useNavigate } from "react-router-dom";
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//dialog box import
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";

/**
 * draggable dialog component
 * @param {*} props
 * @returns
 */
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-name"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "150vh",
    width: "60%",
    margin: "auto",
    marginTop: "20px",
    paddingBottom: "20px",
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  image: {
    backgroundImage:
      "url(https://i.pinimg.com/564x/32/26/35/322635b0ea6fb5a7c459467b4d82eed3.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialState = {
  date: "",
  hours: 1,
  price: 0,
  requirements: "",
  participants: 0,
  errors: {
    date: "",
    hours: "",
    price: "",
    requirements: "",
    participants: "",
  },
};

const AddLiveBoard = (props) => {
  const classes = useStyles();
  let history = useNavigate();
  const [shipData, setShipData] = useState({})
  const [image, setImage] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [state, setState] = useState({
    date: "",
    hours: 1,
    price: "",
    requirements: "",
    participants: "",
    errors: {
        date: "",
      email: "",
      price: "",
      requirements: "",
      participants: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onDrop = (images) => {
    const [uploadedFile] = images;
    setImage(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const api = axios.create({
    baseURL: `http://localhost:5000`,
  });

  useEffect(() => {
    loadData()
}, []);

  const loadData = () => {
    let urldata = window.location.pathname.split("/");
    let shipid = urldata[urldata.length - 1];
    console.log(shipid);
    api.get("/lBoard/" + shipid,{
        })
        .then((res) => {
          setShipData(res.data.data)
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
}

  //Insert data
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const { date, hours, functiontype, price, participants,contact,requirements,email } = state;
      if (validateForm(state.errors)) {
        console.info("Valid Form");
        if (
          // date.trim() !== "" &&
          // hours.trim() !== "" &&
          // requirements.trim() !== "" &&
          // price.trim() !== "" &&
          // participants.trim() !== ""
          true
        ) {
            console.log(functiontype);
            let data = {
            "date":date,
            "hours":hours,
            "amount":shipData.price * state.hours,
            "contact":contact,
            "lbName":shipData.fname,
            "spRequirement":requirements,
            "count":participants,
            "fType":functiontype,
            "email":email,
            "facilities":shipData.facilities}

            setErrorMsg("");
            let postData = await axios.post(`${API_URL}/lbBookings/addlbBookings`, data, {
            });
            console.log(postData);
            setSuccessMsg("Booking is Done!");
            // setOpenSucc(true);
            // props.history.push('/home');
        } else {
          setErrorMsg("Please enter all the field values.");
          // setOpenErr(true);
        }
      } else {
        setErrorMsg("Please enter valid field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
      // setOpenErr(true);
    }
  };

  //clear records
  const reload = () => {
    setState(initialState);
  };

  //validations
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
console.log(event.target.name);
console.log(event.target.value);
    switch (name) {
      case "date":
        errors.date =
          value.length < 2 ? "Name must be 2 characters long!" : "";
        break;
      case "email":
        errors.email =
        (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? "" : "Enter a Valid Email";
        break;
      case "requirements":
        errors.requirements =
          value.length < 4 ? "Publisher must be 4 characters long!" : "";
        break;
      case "price":
        errors.price =
          value.length < 3 ? "Rack Number must be 3 characters long!" : "";
        break;
      default:
        break;
    }
    setState({
      ...state,
      [event.target.name]: event.target.value,
      errors,
      [name]: value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    navigate('/LiveBoardCusView')
    setOpen(false);
  };

  const { errors } = state;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={6} className={classes.image} /> */}
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <Typography component="h1" variant="h5">
            Add Booking to {shipData.date}
          </Typography>
          <div className='center'>
            <img src={shipData.image} width={480} className='m-2' style={{borderRadius:'20px'}}/>
          </div>
          <Typography component="h1" variant="h5">
            Total Price : ${shipData.price * state.hours}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
            <div className={classes.alert}>
              <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-name"
              >
                <DialogTitle
                  style={{
                    cursor: "move",
                    backgroundColor: "#02032b",
                    color: "#ffffff",
                  }}
                  id="draggable-dialog-name"
                >
                  <ScubaDivingIcon /> Diving
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {successMsg !== "" ? (
                      <>
                        <div style={{ color: "#008000" }}>
                          <CheckIcon />
                          {successMsg}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ color: "#aa202b" }}>
                          <ClearIcon />
                          {errorMsg}
                        </div>
                      </>
                    )}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="date"
              // label="Date"
              name="date"
              type='date'
              autoFocus
              value={state.date || ""}
              onChange={handleChange}
            />

            {/* {errors.date.length > 0 && (
              <span className="error">{errors.date}</span>
            )} */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="hours"
              label="hours"
              name="hours"
              type='Number'
              autoFocus
              value={state.hours || ""}
              onChange={handleChange}
            />
            
            
            <TextField
  labelId="functiontype"
  id="functiontype"
  value={state.functiontype || ""}
  label="Function Type"
  fullWidth
  name='functiontype'
  select 
  onChange={handleChange}
>
  <MenuItem value="birthday">
    Birthday Party
  </MenuItem>
  <MenuItem value="annivesary">
    Annivesary
  </MenuItem>
</TextField>

            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
              required
              fullWidth
              id="participants"
              label="Participants"
              name="participants"
              autoComplete="participants"
              autoFocus
              value={state.participants || ""}
              onChange={handleChange}
            />

<TextField
              variant="outlined"
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
              required
              fullWidth
              id="contact"
              label="Contact Number"
              name="contact"
              autoComplete="contact"
              autoFocus
              type="tel"
              value={state.contact || ""}
              onChange={handleChange}
            />

<TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              type="Telephone"
              value={state.email || ""}
              onChange={handleChange}
            />

{errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}
<TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={3}
              id="requirements"
              label="Special requirements"
              name="requirements"
              autoFocus
              value={state.requirements || ""}
              onChange={handleChange}
            />
            <div className={classes.btnGroup}>
              <Button
                id="btnBack"
                type="button"
                // href="/book"
                onClick={history.goBack}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.back}
              >
                Back
              </Button>

              <Button
                id="btnSave"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.sub}
              >
                Save
              </Button>

              {/* <Button
                type="reset"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.clear}
                onClick={reload}
              >
                Clear
              </Button> */}
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddLiveBoard;