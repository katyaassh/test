import {useState} from "react";
import s from './Contacts.module.css'
import arrow from '../../../../assets/icons/arrow.svg'
import clsx from "clsx";

export const Contacts = (props) => {
    const [isVisible, setIsVisible] = useState(false)

    let contacts = Object.entries(props.contacts)
        .filter((contact) => contact[1])
        .map((contact) => ({label: contact[0], url:contact[1]}))

    return (
        <div className={s.contacts}>
            <div onClick={() => setIsVisible(!isVisible)} className={s.contactsLabel}>Мои контакты:
                <img src={arrow} alt=""
                     className={clsx(s.arrow, isVisible && s.arrowExpanded)}/>
            </div>
            {isVisible &&
                <div className={s.contactsItems}>
                    {contacts.map((contact) => <a href={contact.url} target="_blank">{contact.label}</a>)}
                </div>}

        </div>
    )
}
