import logo from "../../img/logo.png";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return <header className={s.header}>
        <img className={s.headerLogo}
             src={logo} alt=""/>
        <div>
            {props.isFetching && '...loading'}
            {!props.isFetching && props.isAuth &&
                <div className={s.logout}>
                    {props.login}
                    <button disabled={props.isFetching} className={s.button} onClick={() => props.logout()}>
                        Выйти
                    </button>
                </div>}
            {!props.isFetching && !props.isAuth &&
                <NavLink to={'/login'} className={s.button}>
                    Войти
                </NavLink>}
        </div>
    </header>
}

export default Header;
