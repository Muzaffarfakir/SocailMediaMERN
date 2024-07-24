import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";

export default function Profile() {
    let nav = useNavigate();
    let [post, setpost] = useState([]);
    function Logout() {
        localStorage.clear();
        nav("/");
        window.location.reload();

    }

    function imgHandling(e) {
        let file = e.target.files[0];
        let data = new FormData();
        let id = window.localStorage.getItem("id");
        data.append("id", id);
        data.append("img", file)

        axios({
            method: "post",
            url: "http://localhost:8080/imgData",
            data: data,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }


            }
        }).then((res) => { window.localStorage.setItem("img", res.data) })



    };
    useEffect(() => {
        axios.get(`http://localhost:8080/postGet/?id=${window.localStorage.getItem("id")}`).then((res) => {
            setpost(res.data)
        }).catch((er) => {
            console.log(er)
        })


    }, [])
    function delPost(id) {
        console.log(id)
        let pid=window.localStorage.getItem("id");
        axios.post("http://localhost:8080/del", { id: id,pid:pid })
        window.location.reload();

    }





    return (
        <>
            <form enctype="multipart/form-data">

                <FontAwesomeIcon className="btn btn-secondary mx-3 my-3" onClick={() => { nav("/") }} icon={faArrowLeft} />
                <div className="mx-auto  w-75" style={{ height: "86vh" }}>
                    <img className="border border-2 d-flex mx-auto w-100 h-75 " style={{ marginTop: "3rem", borderRadius: "10px" }} src={window.localStorage.getItem("img")} />
                    <div className="float-right d-flex mx-auto justify-content-end mx-5 mx-3 ">

                        <input onChange={imgHandling} name="img" type="file" className="d-none " id="fileUpload" />
                        <label htmlFor="fileUpload" className="btn btn-secondary mt-3 mx-2">Upload
                            <FontAwesomeIcon onChange={imgHandling} icon={faCloudArrowUp} className="float-right mt-3 mx-2 rounded-pill" />
                        </label>




                    </div>
                </div >

                <div className="mx-5  ">
                    <h3 >
                        {window.localStorage.getItem("name")}
                    </h3>
                    <h5 >
                        {window.localStorage.getItem("email")}

                    </h5>
                    <p>
                        {window.localStorage.getItem("des")}

                    </p>
                    <p>  <b>{window.localStorage.getItem("con")}</b>, Joined {window.localStorage.getItem("date")}</p>
                    <p><b>{post.length} <span>Posts</span></b></p>
                    <button onClick={Logout} className="  my-3 btn btn-danger">Logout</button>

                </div>
            </form>

            <hr className="my-5 mx-3" />
            <h4 className="text-center my-5">
                Posts
            </h4>
            {
                post.map((el) => {
                    return <div className="mx-auto  w-75" style={{ height: "86vh" }}>
                        <img className="border border-2 d-flex mx-auto w-100 h-75 " style={{ marginTop: "3rem", borderRadius: "10px" }} src={el.Postimg} />
                        <h6 className="my-3 mx-3">{el.text}</h6>
                        <div className="float-right d-flex mx-auto justify-content-end mx-5 mx-3 ">
                            <FontAwesomeIcon className="btn btn-secondary mx-3 my-3" onClick={(e) => { delPost(el._id) }} icon={faTrash} />
                        </div>

                    </div>

                })}

        </>
    )
}