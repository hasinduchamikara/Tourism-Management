// import axios
import axios from "axios";
import usePlaceholder from "react-bootstrap/esm/usePlaceholder";
import { useParams } from "react-router-dom";

// import config
import Config from "./Config";

const api = {
    reservationcreate: "/reservations/create",
    reservationgetall: "/reservations/getall",
    reservationgetone: "/reservations/getone",
    reservationdelete: "/reservations/delete",
    reservationupdate: "/reservations/update",
};



class reservationCtrl {
    api;

    async reservationCreate(data) {
        console.log(data);

        // const config = {
        //     headers: { Authorization: `${localStorage.getItem('usertoken')}` }
        // };
        return new Promise((resolve, reject) => {
            axios.post(`${Config.host}${Config.port}${api.reservationcreate}`, data)
                .then((Response) => {
                    resolve(Response.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    async reservationGet(params) {
        // const config = {
        //     headers: { Authorization: `${localStorage.getItem('usertoken')}` }
        // };
        return new Promise((resolve, reject) => {
            return axios.get(`${Config.host}${Config.port}${api.reservationgetall}`)
                .then(result => {
                    if (result.status === 200) {
                        resolve(result.data)
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    async reservationGetOne(params) {
        // const config = {
        //     headers: { Authorization: `${localStorage.getItem('usertoken')}` }
        // };
        return new Promise((resolve, reject) => {
            return axios.get(`${Config.host}${Config.port}${api.reservationgetone}/${params}`,)
                .then(result => {
                    if (result.status === 200) {
                        resolve(result.data)
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

   async reservationUpdate(id,data) {
         const config = {
             headers: { Authorization: `${localStorage.getItem('usertoken')}` }
         };
        return new Promise((resolve, reject) => {
            return axios.patch(`${Config.host}${Config.port}${api.reservationupdate}/${id}`,data)
                .then(result => {
                    if (result.status === 200) {
                        resolve(result.data)
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    async reservationDelete(params) {
        // const config = {
        //     headers: { Authorization: `${localStorage.getItem('usertoken')}` }
        // };
        return new Promise((resolve, reject) => {
            return axios.delete(`${Config.host}${Config.port}${api.reservationdelete}/${params}`)
                .then(result => {
                    if (result.status === 200) {
                        resolve(result.data)
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

}
export default new reservationCtrl();
