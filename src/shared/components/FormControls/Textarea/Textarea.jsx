import {useField} from "formik";
import s from './Textarea.module.css'
import React from "react";
import clsx from "clsx";

export const Textarea = ({label, validate, ...props}) => {
    const [field, meta] = useField({...props, validate});
    const hasError = meta.error && meta.touched
    return (
        <div>
            <textarea {...field} {...props} className={clsx(s.textarea, hasError ? s.error : '')}></textarea>
            {hasError ? <div className={s.errorText}>{meta.error}</div> : null}
        </div>
    )
}
