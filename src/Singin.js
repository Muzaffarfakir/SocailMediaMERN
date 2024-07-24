import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function Singing() {
    let nav = useNavigate();
    let [name, setname] = useState();
    let [email, setemail] = useState();
    let [pass, setpass] = useState();
    let [des, setdes] = useState();
    let [con, setcon] = useState();
    let [singColor, setSignColor] = useState(false);


    function sinup() {
        if (name === undefined || null || email === undefined || pass === undefined || des === undefined || con === undefined) {
            alert("Fill All Inputs Properly !")

        }
        else {
            axios.post("http://localhost:8080/signData", { name, email, pass, des, con }).then((res) => {
                if (res.data === "invalid") {
                    setSignColor(true);
                    console.log(res.data)

                }
                else if (res.data === "valid") {
                    setSignColor(false)
                    nav("/login");
                    console.log(res.data)


                }

            })


        }
    }



    return (
        <>
            <FontAwesomeIcon className="btn btn-secondary mx-3 my-3" onClick={() => { nav("/") }} icon={faArrowLeft} />


            <div>

                <h2 className="text-center my-3 ">
                    SignUp Here!
                </h2>            <input name="name" onChange={(e) => { setname(e.target.value) }} className=" w-75 mx-auto form-control my-5  " type="name" placeholder="Enter Name here" />
                <input name="email" onChange={(e) => { setemail(e.target.value) }} className="w-75 mx-auto form-control my-5  " type="email" placeholder="Enter Email here" />
                <input name="pass" onChange={(e) => { setpass(e.target.value) }} className="w-75 mx-auto form-control my-5  " type="password" placeholder="Enter Password here" />
                <textarea name="desc" onChange={(e) => { setdes(e.target.value) }} placeholder="Enter About Yourself !" className="w-75 mx-auto form-control my-5 resize-none" rows={3} cols={3}></textarea>
                <select className="form-select w-50 my-5 mx-auto" onChange={(e) => { setcon(e.target.value) }}>
                    <option value={"Asia"}>Asia </option>
                    <option value={"Europe"}>Europe </option>
                    <option value={"South-America"}>South-America </option>
                    <option value={"North-America"}>North-America </option>
                    <option value={"Austrilia"}>Austrilia </option>
                    <option value={"Africa"}>Africa</option>
                    <option value={"Antartica"}>Antartica </option>
                </select>
                {!singColor ? (null) : (<p className="text-center text-danger "> This Eamil Is Already in Use !</p>)}
                {/* <p className="text-center text-danger "> This Eamil Is Already in Use !</p> */}
                <button className="d-flex mx-auto btn btn-primary  my-5" onClick={sinup}>SignUp</button>
                <p className=" d-flex mx-auto text-center justify-content-center my-5">I Have an a  <button onClick={() => { nav("/Login") }} className=" btn btn-primary mx-2">Account</button> </p>

            </div>





        </>
    )
}