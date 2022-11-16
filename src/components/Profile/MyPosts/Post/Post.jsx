import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://img.piri.net/mnresize/900/-/resim/upload/2019/04/30/06/01/66773cc69geek_57422072_188988358751532_8982900449151706818_n.jpg" alt=""/>
            {props.message}
            <div>
                <span>like</span> { props.likeCount }
            </div>
        </div>
    )
}

export default Post;
