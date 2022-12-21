import {connect} from "react-redux";
import {
    getUsers,
    toggleSubscription,
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import {Pagination} from "../../shared/components/Pagination/Pagination";
import s from './Users.module.css'
import Loader from "../../shared/components/Loader/Loader";
import {compose} from "redux";
import {withAuthRedirect} from "../../shared/hocs/withAuthRedirect";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged(currentPage) {
        this.props.getUsers(currentPage, this.props.pageSize)
    }


    render() {
        return <div className={s.userContainer}>
            <h2>Users</h2>
            {
                this.props.isFetching ?
                    <Loader/> :
                    <>
                        <Pagination
                            total={this.props.totalUsersCount}
                            currentPage={this.props.currentPage}
                            pageSize={this.props.pageSize}
                            onPageChange={this.onPageChanged.bind(this)}
                        />
                        <Users
                            users={this.props.users}
                            followingProgress={this.props.followingProgress}
                            toggleSubscription={this.props.toggleSubscription}
                        />
                    </>
            }
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}

export default compose(
    connect(mapStateToProps, {
        getUsers,
        toggleSubscription
    }),
    withAuthRedirect
)(UsersContainer)
