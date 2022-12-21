export const validatePost = (value) => {
    if (!value) {
        return 'Обязательное поле'
    } else if (value.length > 10) {
        return 'Максимальная длина 10 символов'
    }
    return null
}

export const validateMessage = (value) => {
    if (!value) {
        return 'Обязательное поле'
    } else if (value.length > 15) {
        return 'Максимальная длина 15 символов'
    }
    return null
}

export const validateEmail = (value) => {
    if (!value) {
        return 'Обязательное поле'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Неверный формат Email'
    }
    return null
}

export const validatePassword = (value) => {
    if (!value) {
        return 'Обязательное поле'
    }
    return null
}

export const required = (value) => {
    if (!value) {
        return 'Обязательное поле'
    }
    return null
}
