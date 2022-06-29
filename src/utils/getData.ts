export function getUser(key:string) {
    if ((typeof key)==='string'){
        // @ts-ignore
        return JSON.parse(sessionStorage.getItem(key))
    }else {
        return {
            "user_name_id": "Login",
        }
    }
}

export function getType(key:string) {
    if ((typeof key)==='string'){
        // @ts-ignore
        return JSON.parse(sessionStorage.getItem(key))
    }else {
        return {
            "user_name_id": "Login",
        }
    }
}