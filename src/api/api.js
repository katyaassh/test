import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '86732a1f-e49a-4747-aba2-45618d1865a3'
    }
})

export const userAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    }
}


export const subscriptionAPI = {
    follow(id) {
        return instance.post(`follow/${id}`).then(response => response.data.resultCode)
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`).then(response => response.data.resultCode)
    }
}

export const profileAPI = {
    getProfile(id) {
        return instance.get(`profile/${id}`).then(response => response.data)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    updatePhoto(photo) {
        const data = new FormData()
        data.append('image', photo)
        return instance.put('/profile/photo', data, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    updateProfile(data) {
        return instance.put('profile', data)
    }
}

export const authAPI = {
    getAuthInfo() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email, password, rememberMe) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    }
}
