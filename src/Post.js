import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";

export default function Post() {
    let nav = useNavigate();
    let [text, settext] = useState();
    let [file, setfile] = useState();
    let imgref = useRef(null);
    let imgehandle = (e) => {
        let file = e.target.files[0];
        if (file) {
            setfile(file);
            imgref.current.src = URL.createObjectURL(file)

        }




    }



    function handle(e) {
        e.preventDefault();
        if (!text || !file) { alert("Please Fill All Inputs !") } else {
            let data = new FormData();
            let id = window.localStorage.getItem("id");
            data.append("text", text);
            data.append("postimg", file);
            data.append("id", id);


            axios({
                method: "post",
                url: "http://localhost:8080/posts",
                data: data,
                config: {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }

            });
            nav("/");
            window.location.reload(true)

        }


    }
    return (
        <>
            <FontAwesomeIcon className="btn btn-secondary mx-3 my-3" onClick={() => { nav("/") }} icon={faArrowLeft} />

            <form onSubmit={handle} enctype="multipart/form-data">

                <div className="form-group my-5 mx-5">
                    <textarea onChange={(e) => { settext(e.target.value) }} className="form-control no-border mx-auto  w-75 input-btn-focus-box-shadow: none  mx-3 " cols={50} rows={8} placeholder="Enter Here  ! " ></textarea>
                </div>


                <img ref={imgref} name="postimg" className="border border-2 d-flex mx-auto w-75 h-75 " style={{ marginTop: "3rem", borderRadius: "10px", height: "86vh" }} />
                <div className="float-right d-flex mx-auto justify-content-end mx-5 mx-3 ">

                    <input onChange={imgehandle} name="postimg" type="file" className="d-none " id="fileUpload" />
                    <label htmlFor="fileUpload" className="btn btn-secondary mt-3 mx-2">
                        <FontAwesomeIcon icon={faCloudArrowUp} className="float-right mt-3 mx-2 rounded-pill" />
                    </label>


                </div>
                <button className="d-flex mx-auto my-5 btn btn-primary">Post</button>

            </form>



        </>
    )
}