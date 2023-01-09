import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={s.nav}>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to='/profile' className = { navData => navData.isActive ? s.active : s.item }>Профиль</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/dialogs' className = { navData => navData.isActive ? s.active : s.item }>Сообщения</NavLink>
        </div>
        <div className={s.item}>
            <NavLink>Новости</NavLink>
        </div>
        <div className={s.item}>
            <NavLink>Музыка</NavLink>
        </div>
        <div className={s.item}>
            <NavLink>Настройки</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to='/users' className = { navData => navData.isActive ? s.active : s.item }>Все пользователи</NavLink>
        </div>

    </nav>
}

export default Navbar;
