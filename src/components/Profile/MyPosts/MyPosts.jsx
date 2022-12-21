import s from './MyPosts.module.css'
import Post from "./Post/Post";
import React from "react";
import {Form, Formik} from "formik";
import {Textarea} from "../../../shared/components/FormControls/Textarea/Textarea";
import {validatePost} from "../../../shared/utils/validators";

const MyPosts = (props) => {

    let onAddPost = (values, {resetForm}) => {
        props.addPost(values.postText)
        resetForm()
    }

    let onLikeClick = (postId) => {
        props.updateLikesCount(postId)
    }

    return (
        <div className={s.postsBlock}>
            <div className={s.label}>Мои посты</div>

            <Formik
                initialValues={{postText: ''}}
                onSubmit={onAddPost}
            >
                {() => (
                    <Form>
                        <Textarea type="text" name="postText"
                               placeholder="Введите текст" validate={validatePost}
                               autoComplete={"off"} />

                        <button type="submit" className={s.newPostButton}>
                            Добавить пост
                        </button>
                    </Form>
                )}
            </Formik>
            <div className={s.posts}>
                {props.profilePage.posts.map((post) => <Post onLikeClick={onLikeClick} message={post.message}
                                                             key={post.id} likeCount={post.likeCount} id={post.id}/>)}
            </div>
        </div>
    )
}

export default MyPosts;
