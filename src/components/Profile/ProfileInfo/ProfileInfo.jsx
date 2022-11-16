import s from'./ProfileInfo.module.css'

const ProfileInfo = () => {
    return <div>
        <div className='cover'>
            <img
                src="https://animeshka.org/uploads/posts/2022-07/1657254260_32-animeshka-org-p-aesthetic-background-foni-32.jpg"
                alt=""/>
        </div>
        <div className={s.descriptionBlock}>
            ava + description
        </div>
    </div>
}

export default ProfileInfo;
