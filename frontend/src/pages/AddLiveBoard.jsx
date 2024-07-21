import React, { useState, useRef, Component } from "react";
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
  fname: "",
  facilities: "",
  price: "",
  description: "",
  capacity: "",
  image: "",
  errors: {
    fname: "",
    facilities: "",
    price: "",
    description: "",
    capacity: "",
  },
};

const AddLiveBoard = (props) => {
  const classes = useStyles();
  let history = useNavigate();
  const [image, setImage] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [state, setState] = useState({
    fname: "",
    facilities: "",
    price: "",
    description: "",
    capacity: "",
    errors: {
        fname: "",
      facilities: "",
      price: "",
      description: "",
      capacity: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [open, setOpen] = useState(false);

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

  //Insert data
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setOpen(true);
    try {
      const { fname, facilities, price, description, capacity } = state;
      if (validateForm(state.errors)) {
        console.info("Valid Form");
        if (
          fname.trim() !== "" &&
          facilities.trim() !== "" &&
          description.trim() !== "" &&
          price.trim() !== "" &&
          capacity.trim() !== ""
        ) {
          if (image) {
            const formData = new FormData();
            formData.append("fname", fname);
            formData.append("facilities", facilities);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("capacity", capacity);
            formData.append("image", image);

            setErrorMsg("");
            await axios.post(`${API_URL}/lBoard/insert`, formData, {
            });
            setSuccessMsg("upload Success");
            // setOpenSucc(true);
            // props.history.push('/home');
          } else {
            setErrorMsg("Please select a image to add.");
            // setOpenErr(true);
          }
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

    switch (name) {
      case "fname":
        errors.fname =
          value.length < 2 ? "Name must be 2 characters long!" : "";
        break;
      case "facilities":
        errors.facilities =
          value.length < 4 ? "Author must be 4 characters long!" : "";
        break;
      case "description":
        errors.description =
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

    setOpen(false);
  };

  const { errors } = state;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <br />
          <Typography component="h1" variant="h5">
            Add Liveboard
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
              id="fname"
              label="Name"
              name="fname"
              autoComplete="fname"
              autoFocus
              value={state.fname || ""}
              onChange={handleChange}
            />
            {errors.fname.length > 0 && (
              <span className="error">{errors.fname}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="facilities"
              label="Facilities"
              name="facilities"
              autoComplete="facilities"
              autoFocus
              value={state.facilities || ""}
              onChange={handleChange}
            />
            {errors.facilities.length > 0 && (
              <span className="error">{errors.facilities}</span>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={5}
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
              value={state.description || ""}
              onChange={handleChange}
            />
            {errors.description.length > 0 && (
              <span className="error">{errors.description}</span>
            )}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              autoComplete="price"
              autoFocus
              value={state.price || ""}
              onChange={handleChange}
            />
            {errors.price.length > 0 && (
              <span className="error">{errors.price}</span>
            )}

            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
              required
              fullWidth
              id="capacity"
              label="Capacity"
              name="capacity"
              autoComplete="capacity"
              autoFocus
              value={state.capacity || ""}
              onChange={handleChange}
            />

            <div className="upload-section">
              <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder("over")}
                onDragLeave={() => updateBorder("leave")}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps({ className: "drop-zone" })}
                    ref={dropRef}
                  >
                    <input {...getInputProps()} />
                    <p>Drag And Drop a Image Or Click Here To Select a Image</p>
                    {image && (
                      <div>
                        <strong>Selected image:</strong> {image.name}
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              <div className="prew">
                {previewSrc ? (
                  isPreviewAvailable ? (
                    <div className="image-preview">
                      <img
                        className="preview-image"
                        src={previewSrc}
                        alt="Preview"
                        width="200px"
                        style={{ maxHeight: "200", maxWidth: "200" }}
                        align-item="center"
                      />
                    </div>
                  ) : (
                    <div className="preview-message">
                      <p>No preview available for this image</p>
                    </div>
                  )
                ) : (
                  <div className="preview-message">
                    {/* <p>Image preview will be shown here after selection</p> */}
                    <img
                      src={dummy}
                      alt="John"
                      style={{ width: "250px", height: "200px", margin: "5px" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={classes.btnGroup}>
              <Button
                id="btnBack"
                type="button"
                href="/liveBoardView"
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

              <Button
                type="reset"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.clear}
                onClick={reload}
              >
                Clear
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddLiveBoard;