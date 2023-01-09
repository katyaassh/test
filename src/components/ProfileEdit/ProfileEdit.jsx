import {Field, Form, Formik} from "formik";
import s from "../ProfileEdit/ProfileEdit.module.css";
import {Input} from "../../shared/components/FormControls/Input/Input";
import {required} from "../../shared/utils/validators";
import clsx from "clsx";
import {connect} from "react-redux";
import {getProfile, updateProfile} from "../../redux/profile-reducer";
import {useEffect} from "react";
import Loader from "../../shared/components/Loader/Loader";
import {useNavigate} from "react-router-dom";

const ProfileEdit = (props) => {

    useEffect(() => {
        props.getProfile(props.authorizedUserId)
    }, [])

    const onSubmit = (values, {setStatus, setSubmitting}) => {
        const {fullName, aboutMe, lookingForAJob, lookingForAJobDescription, ...contacts} = values
        props.updateProfile(
            {
                userId: props.authorizedUserId, fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts
            },
            setSubmitting,
            onSuccess,
            setStatus
        )
        console.log(onSuccess)
    }

    const navigate = useNavigate()

    const onSuccess = () => {
        navigate('/profile')
    }


    return (
        <div>
            {!props.profile ?
                <Loader/> :
                <Formik
                    initialValues={{
                        fullName: props.profile.fullName,
                        aboutMe: props.profile.aboutMe,
                        lookingForAJob: props.profile.lookingForAJob,
                        lookingForAJobDescription: props.profile.lookingForAJobDescription || '',
                        github: props.profile.contacts.github || '',
                        vk: props.profile.contacts.vk || '',
                        facebook: props.profile.contacts.facebook || '',
                        instagram: props.profile.contacts.instagram || '',
                        twitter: props.profile.contacts.twitter || '',
                        website: props.profile.contacts.website || '',
                        youtube: props.profile.contacts.youtube || '',
                        mainLink: props.profile.contacts.mainLink || '',
                    }}
                    onSubmit={onSubmit}
                >
                    {({isSubmitting, status}) => (
                        <Form className={s.loginForm}>
                            <Input type="text" name="fullName" placeholder="Введите имя" label={'Имя:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="aboutMe" placeholder="Введите текст" label={'Обо мне:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <label className={clsx(s.formField, s.loginCheckbox)}>
                                <Field type="checkbox" name="lookingForAJob"/>
                                Ищу работу
                            </label>
                            <Input type="text" name="lookingForAJobDescription" placeholder="Введите описание"
                                   validate={required}
                                   label={'Описание поиска работы:'}
                                   autoComplete={"off"}/>
                            <Input type="text" name="github" placeholder="Введите ссылку" label={'Github:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="vk" placeholder="Введите ссылку" label={'Vk:'} validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="facebook" placeholder="Введите ссылку" label={'Facebook:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="instagram" placeholder="Введите ссылку" label={'Instagram:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="twitter" placeholder="Введите ссылку" label={'Twitter:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="website" placeholder="Введите ссылку" label={'Website:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="youtube" placeholder="Введите ссылку" label={'YouTube:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <Input type="text" name="mainLink" placeholder="Введите ссылку" label={'MainLink:'}
                                   validate={required}
                                   autoComplete={"off"}/>
                            <div className={status ? s.error : null}>{status}</div>
                            <button type="submit" disabled={isSubmitting} className={clsx(s.formField, s.button)}>
                                Сохранить изменения
                            </button>
                        </Form>
                    )}
                </Formik>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    authorizedUserId: state.auth.id
})


export default connect(mapStateToProps, {getProfile, updateProfile})(ProfileEdit)
