export const setUserToken = (userToken) => {
    localStorage.setItem('TOKEN', userToken)
}

export const getUserToken = () => {
    return localStorage.getItem('TOKEN')
}

export const removeUserToken = () => {
    localStorage.removeItem('TOKEN')
}