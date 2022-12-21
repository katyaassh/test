import {useEffect, useState} from "react";

export const ProfileStatus = (props) => {
    const [isEdit, setIsEdit] = useState(false)

    const [status, setStatus] = useState('')

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const onBlur = () => {
        setIsEdit(false);
        if (props.status !== status) {
            props.updateStatus(status)
        }
    }

    return (
        <div>
            {
                !isEdit ?
                    <span onDoubleClick={() => setIsEdit(true)}>{props.status || 'Введите статус...'}</span>
                    :
                    <input onChange={(e) => setStatus(e.target.value)} autoFocus={true} onBlur={onBlur}
                           value={status}/>
            }
        </div>
    )
}
