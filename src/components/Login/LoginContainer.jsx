import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Login} from "./Login";
import {Navigate} from "react-router-dom";

const LoginContainer  = (props) => {
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }
        return <Login {...props}/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(LoginContainer)
