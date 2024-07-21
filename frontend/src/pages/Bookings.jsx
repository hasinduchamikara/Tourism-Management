import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/constants";
import "./view.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const Bookings = (props) => {
  const { useState } = React;
  const [data, setData] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [successMsg, setSuccessMsg] = useState([]);
  const [issucc, setIssucc] = useState(false);

  useEffect(() => {
    const getFileList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/lbBookings/getlbBookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setErrorMsg("");
        setData(data);
        console.log(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
        console.log(error);
      }
    };

    getFileList();

    console.log(data);
  }, []);

  const [columns, setColumns] = useState([
    // {
    //   title: "Image",
    //   field: "image",
    //   render: (rowData) => (
    //     <img
    //       style={{ height: 50, width: 50, borderRadius: "10%" }}
    //       // src={`http://localhost:5000/${rowData.image}`}
    //       src={rowData.image}
    //     />
    //   ),
    // },
    { title: "Email", field: "email" },
    { title: "Facilities", field: "facilities" },
    { title: "Contact", field: "contact", type: "numeric" },
    { title: "Liveboard Name", field: "lbName" },
    { title: "Date", field: "date" },
    { title: "Hours", field: "hours", type: "numeric" },
    { title: "Amount", field: "amount", type: "numeric" },
    { title: "Function Type", field: "fType" },
    { title: "Count", field: "count", type: "numeric"  },
    { title: "Special Requirement", field: "spRequirement" },
    
  ]);

  /////////////////////////update rows
  const api = axios.create({
    baseURL: `http://localhost:5000`,
  });

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.title === "") {
      errorList.push("Please enter title");
    }
    if (newData.author === "") {
      errorList.push("Please enter author");
    }
    if (newData.publisher === "") {
      errorList.push("Please enter publisher");
    }
    if (newData.noOfCopies === "") {
      errorList.push("Please enter noOfCopies");
    }

    if (errorList.length < 1) {
      api
        .put("/lBoard/" + newData._id, newData, {
        })
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
        })
        .catch((error) => {
          setErrorMsg(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMsg(errorList);
      setIserror(true);
      resolve();
    }
  };

  ////////////Delete Row

  const handleRowDelete = (oldData, resolve) => {
    api
      .delete("/lBoard/" + oldData._id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
        setSuccessMsg(["Delete success"]);
        setIssucc(true);
      })
      .catch((error) => {
        setErrorMsg(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div>
      <br />
      <br />
      <h1 id="h12" align="center">
        Bookings
      </h1>
      <div className="tbl">
        <div>
          {iserror && (
            <Alert severity="error">
              {errorMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}

          {issucc && (
            <Alert severity="success">
              {successMsg.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}
        </div>

        <MaterialTable
        title=""
          columns={columns}
          data={data}
        //   editable={{
        //     onRowUpdate: (newData, oldData) =>
        //       new Promise((resolve, reject) => {
        //         handleRowUpdate(newData, oldData, resolve);
        //       }),

        //     onRowDelete: (oldData) =>
        //       new Promise((resolve, reject) => {
        //         handleRowDelete(oldData, resolve);
        //       }),
        //   }}
          options={{
            headerStyle: {
              backgroundColor: "rgba(8, 9, 70, 0.363)",
              color: "rgba(0, 0, 0)",
            },
            actionsColumnIndex: -1,
            exportButton: true,
            search: true
          }}
        />

      </div>
    </div>
  );
};

export default Bookings;