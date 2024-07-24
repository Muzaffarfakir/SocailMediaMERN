import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faL, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";





export default function Home() {
    let nav = useNavigate();
    let [color, setcolor] = useState("black");
    let [like, setlike] = useState(false);
    let [likecout, setlikecount] = useState(0);
    let [posts, setposts] = useState([]);



    useEffect(() => {
        fetch("https://socailmediamern.onrender.com/Allposts").then((res) => res.json()).then((data) => {
            setposts(data)
        })
    }, [])

    return (
        <>
            {posts.map((el) => {

                return <div className="card bg-dark h-100 w-75 d-flex mx-auto my-3 mx-3 text-light" style={{ width: "75%" }}>
                    <div className="mx-3  ">
                        <img className="border mx-3  d-flex mx-auto w-100 h-75 " style={{ marginTop: "4rem", borderRadius: "10px", }} src={el.Postimg} />
                    </div>
                    <h6 className="my-3 mx-3">{el.text}</h6>
                    <div className="d-flex">
                        {/* <FontAwesomeIcon style={{ color: color }} className="mx-2 my-3" onClick={() => { toggleliked(el._id) }} icon={faHeart} /> */}
                        <span className="my-3">

                        </span>
                    </div>




                </div>
            })}






            <FontAwesomeIcon onClick={() => { nav("/post") }} className=" btn btn-primary position-fixed " style={{ top: "75%", left: "89%" }} icon={faPlus} />



        </>
    )
}
