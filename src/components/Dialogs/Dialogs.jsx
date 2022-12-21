import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";
import {Form, Formik} from "formik";
import {validateMessage} from "../../shared/utils/validators";
import {Textarea} from "../../shared/components/FormControls/Textarea/Textarea";


const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>)
    let messagesElement = props.dialogsPage.messages.map((m) => <Message id={m.id} key={m.id} message={m.message}/>)

    let addMessage = (values, {resetForm}) => {
        props.addMessage(values.message)
        resetForm()
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElement}
            </div>
            <div className={s.newMessages}>
                <Formik
                    initialValues={{message: ''}}
                    onSubmit={addMessage}
                >
                    {() => (
                        <Form>
                            <Textarea type="text" name="message"
                                      placeholder="Введите текст" validate={validateMessage}
                                      autoComplete={"off"} className={s.input}/>
                            <button type="submit" className={s.messageButton}>
                                Отправить
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Dialogs;


