import {Field, Form, Formik} from "formik";
import s from './Login.module.css'
import clsx from "clsx";
import {required, validateEmail, validatePassword} from "../../shared/utils/validators";
import {Input} from "../../shared/components/FormControls/Input/Input";

export const Login = (props) => {
    const onSubmit = (values, {setSubmitting, setStatus}) => {
        console.log(values)
        props.login(values.email, values.password, values.rememberMe, values.captcha, setSubmitting, setStatus)
    }


    return <div className={s.loginFormContainer}>
        <h1>Вход</h1>
        <Formik
            initialValues={{email: '', password: '', rememberMe: false, captcha:''}}
            onSubmit={onSubmit}
        >
            {({isSubmitting, status, setStatus}) => (
                <Form className={s.loginForm} onChange={() => setStatus('')}>
                    <Input type="text" name="email" placeholder="Email"
                           autoComplete={"off"} validate={validateEmail}/>
                    <Input type="password" name="password" placeholder="Пароль"
                           validate={validatePassword}/>
                    <div className={status ? s.error : null}>{status}</div>
                    <label className={clsx(s.formField, s.loginCheckbox)}>
                        <Field type="checkbox" name="rememberMe"/>
                        Запомнить меня
                    </label>
                    {props.captchaUrl && <div>
                        <img src={props.captchaUrl} />
                        <Input type="text" name="captcha" placeholder="Введите текст с картинки"
                        validate={required}/>
                    </div>}
                    <button type="submit" disabled={isSubmitting} className={clsx(s.formField, s.button)}>
                        Войти
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}
