import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom"
import Profile from "./Profile";
import Home from "./Home";
import Singing from "./Singin";
import Login from "./Login";
import Post from "./Post";
export default function Navbar() {
    let [loggedCheck, setLoggedCheck] = useState(false);
    useEffect(() => {
        if (window.localStorage.getItem("token")) {
            setLoggedCheck(true);
        }
        else {
            setLoggedCheck(false)

        }

    }, [])



    return (
        <>
            <BrowserRouter>
                <Link to={"/"} className="d-none">Home</Link>
                <div className="d-flex mx-3 my-5 ">
                    <button onClick={() => { document.body.style.backgroundColor = "white"; document.body.style.color = "black" }} className="btn bg-light text-dark rounded-pill">Light</button>
                    <button onClick={() => { document.body.style.backgroundColor = "#303030"; document.body.style.color = "white" }} className="btn bg-dark text-light rounded-pill">Dark</button>
                    <h2 className="text-center m-auto">MuzziY</h2>
                    <Link className="d-none" to={"/Login"}> </Link>
                    <Link className="d-none" to={"/post"}> </Link>


                    {!loggedCheck ? (<div>
                        <Link className="" to={"/Singin"}>
                            <img src="" alt="Logo" className="border border-2 rounded-circle " />
                        </Link>

                    </div>) : (<div>
                        <Link className="" to={"/Profile"}>
                            <img src={window.localStorage.getItem("img")} alt="Logo" className="border border-2 rounded-circle  " style={{ width: "46px", height: "43px" }} />
                        </Link>


                    </div>)}

                </div>
                <hr />
                <Routes>
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Singin" element={<Singing />} />
                    <Route path="/Login" element={<Login />} />

                    <Route path="/post" element={<Post />} />

                    <Route path="/" element={<Home />} />

                </Routes>
            </BrowserRouter>


        </>
    )
}