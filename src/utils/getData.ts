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




export function get_brief_movie_info(key:string) {
    let type_recommend = getType(key);
    var i = 0;
    const names: string[]=[];
    const years: string[]=[];
    const posters: string[]=[];
    const evaluation: string[]=[];
    const id: string[]=[];
    for(i=0; i<10; i++) {
        // let j = Math.random() * (40 + 1) + 0;
        let a = Math.random() * 40
        let j = parseInt(String(a))
        if (j > i) {
            j = j-i
        }
        names[i] = type_recommend[j]['movie_name'];
        years[i] = type_recommend[j]['movie_year']
        posters[i] = require("@/assets/poster/" + type_recommend[j]['movie_id'] + ".jpg");
        evaluation[i] = type_recommend[j]['movie_evaluation']
        id[i] = type_recommend[j]['movie_id']
    }
    return {"name": names, "poster": posters, "year": years, "evaluation": evaluation, 'id': id};
}


export function get_brief_movie_info1(key:string) {
    let type_recommend = getType(key);
    var i = 0;
    const names: string[]=[];
    const years: string[]=[];
    const posters: string[]=[];
    const evaluation: string[]=[];
    const id: string[]=[];
    for(i=0; i<10; i++) {
        // let j = Math.random() * (40 + 1) + 0;
        names[i] = type_recommend[i]['movie_name'];
        years[i] = type_recommend[i]['movie_year']
        posters[i] = require("@/assets/poster/" + type_recommend[i]['movie_id'] + ".jpg");
        evaluation[i] = type_recommend[i]['movie_evaluation']
        id[i] = type_recommend[i]['movie_id']
    }
    return {"name": names, "poster": posters, "year": years, "evaluation": evaluation, 'id': id};
}


export function get_all_movie(key: string) {

    let movies = getType(key);

    const names: string[]=[];
    const years: string[]=[];
    const posters: string[]=[];
    const evaluation: string[]=[];
    const style: string[]=[];
    const id: string[]=[];
    const country: string[]=[];
    const language: string[]=[];
    const imdb: string[]=[];
    const roles: string[]=[];
    const director: string[]=[];
    const long: string[]=[];
    const screenwriter: string[]=[];
    var i = 0
    for (i=0; i<movies.length; i++) {
        names[i] = movies[i]['movie_name']
        years[i] = movies[i]['movie_year']
        posters[i] = require("@/assets/poster/" + movies[i]['movie_id'] + ".jpg");
        evaluation[i] = movies[i]['movie_evaluation']
        director[i] = movies[i]['movie_director']
        roles[i] = movies[i]['movie_roles']

        long[i] = movies[i]['movie_long']
        style[i] = movies[i]['movie_style']
    }
    return {
        "name": names,
        "year": years,
        "poster": posters,
        "evaluation": evaluation,
        "director": director,
        "role": roles,
        "long": long,
        "style": style,
    }
}
