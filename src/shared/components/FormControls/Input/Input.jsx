import {useField} from "formik";
import s from './Input.module.css'
import React from "react";
import clsx from "clsx";

export const Input = ({label, validate, ...props}) => {
    const [field, meta] = useField({...props, validate});
    const hasError = meta.error && meta.touched
    return (
        <div>
            <label>{label}</label>
                <input {...field} {...props} className={clsx(s.input, hasError ? s.error : '')}></input>
                {hasError ? <div className={s.errorText}>{meta.error}</div> : null}
        </div>
    )
}
