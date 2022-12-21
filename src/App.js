import React, { Suspense } from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {useEffect} from "react";
import {connect} from "react-redux";
import {initializeApp} from "./redux/app-reducer";
import Loader from "./shared/components/Loader/Loader";
// import {ProfileEdit} from "./components/ProfileEdit/ProfileEdit";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));
const ProfileEdit = React.lazy(() => import('./components/ProfileEdit/ProfileEdit'))

const App = (props) => {
    useEffect(() => {props.initializeApp()}, [])
    if (!props.initialization) {
        return <Loader/>
    }
    return (
        <BrowserRouter>
            <Suspense>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/profile/edit' element={<ProfileEdit />}/>
                        <Route path='/profile/:userId' element={<ProfileContainer />}/>
                        <Route path='/profile/' element={<ProfileContainer />}/>
                        <Route path='/dialogs/*' element={<DialogsContainer />}/>
                        <Route path='/users' element={<UsersContainer />}/>
                        <Route path='/login' element={<LoginContainer />}/>
                    </Routes>
                </div>
            </div>
            </Suspense>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    initialization: state.app.initialization
})

export default connect(mapStateToProps, {initializeApp})(App);
