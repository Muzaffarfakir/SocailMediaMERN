import React, { act, createContext, useReducer } from "react";
import Navbar from "./Navbar";

export let Context = createContext();
let intialstate = [];
function reducer(state, action) {
    switch (action.type) {
        case "ProfileDataShow":
            return [action.profiledata];


        default:
            return state;


    }

}


export function Contextt() {
    let [state, dispatch] = useReducer(reducer, intialstate)
    return (
        <>
            <Context.Provider value={{state,dispatch}}> 
                <Navbar />
            </Context.Provider>



        </>
    )

}