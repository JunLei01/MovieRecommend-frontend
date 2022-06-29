export function setToken(tokenKey: any, token: any) {
    return localStorage.setItem(tokenKey, token)
}

export function getToken(tokenKey: any) {
    return localStorage.getItem(tokenKey)
}

export function removeToken(tokenKey: any) {
    return localStorage.removeItem(tokenKey)
}
