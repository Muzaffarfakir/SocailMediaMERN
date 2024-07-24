import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
    let [Credcolor, setcred] = useState(false);
    let [email, setemail] = useState();
    let [pass, setpass] = useState();
    let nav = useNavigate()


    function Login() {
        if (email === undefined || pass === undefined) {
            alert("Fill All Inputs Properly !")
        }
        else {
            axios.post("http://localhost:8080/LoginDta", { pass, email }).then((data) => {
                if (data.data.mess === "hai") {
                    setcred(false);
                    window.localStorage.setItem("token", data.data.token);
                    window.localStorage.setItem("id", data.data.data._id);
                    window.localStorage.setItem("name", data.data.data.name)
                    window.localStorage.setItem("des", data.data.data.des)
                    window.localStorage.setItem("con", data.data.data.Con)
                    window.localStorage.setItem("email", data.data.data.email)
                    window.localStorage.setItem("date", data.data.data.date)
                    nav("/profile");


                } else {
                    setcred(true);
                }
            })
        }
    }


    return (
        <>
            <div> <h1 className="text-center">Login Here</h1>
                <input onChange={(e) => { setemail(e.target.value) }} className="w-75 mx-auto form-control my-5  " type="email" placeholder="Enter Email here" />
                <input onChange={(e) => { setpass(e.target.value) }} className="w-75 mx-auto form-control my-5  " type="password" placeholder="Enter Passward here" />
                {!Credcolor ? (null) : (<h6 className="text-danger text-center my-3 ">Wrong Credentials Please Try agian ! </h6>)}
                <button className="d-flex mx-auto btn btn-primary  my-5" onClick={Login}>Login</button>
                <p className=" d-flex mx-auto text-center justify-content-center my-5">I Don't Have an   <button onClick={() => { nav("/Singin") }} className=" btn btn-primary mx-2">Account</button> </p>


            </div>



        </>
    )
}