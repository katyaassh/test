import s from './Dialogs.module.css'
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";

import React from "react";
import {addMessageActionCreator, updateNewMessageActionCreator} from "../../redux/dialogs-reducer";


const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map((d) => <DialogItem name={d.name} id={d.id}/>)
    let messagesElement = props.state.messages.map((m) => <Message id={m.id} message={m.message}/>)
    let newMessageElement = React.createRef()

    let addMessage = () => {
        props.dispatch(addMessageActionCreator())
    }
    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.dispatch(updateNewMessageActionCreator(text))
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
                <textarea onChange={onMessageChange} ref={newMessageElement} className={s.input} value={props.state.newMessageText} placeholder={'Enter your message'}></textarea>
                <button disabled={!props.state.newMessageText} onClick={addMessage} className={s.messageButton}>Send</button>
            </div>
        </div>
    )
}

export default Dialogs;


