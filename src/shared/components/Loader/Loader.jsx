import loader from "../../../assets/icons/loader.svg";
import s from "../../../components/Users/Users.module.css";
import React from "react";

let Loader = () => {
    return <img src={loader} alt="" className={s.loader}/>

}

export default Loader
