import { API_Key, BASE_URL } from "../components/config"

export const GET = async (url) => {
    const API_URL = `${BASE_URL}${url}?api_key=${API_Key}`;

    let response = await fetch(API_URL, {method: "GET"});
    response = response.json();

    return response;
} 

export const GETsearch = async (movieOrActors, query) => {
    const API_URL = `${BASE_URL}/search/${movieOrActors}?api_key=${API_Key}&query=${query}`

    let response = await fetch(API_URL, {method: "GET"});
    response = response.json();

    return response;

}

export const GETnewPage = async (page) => {
    const API_URL = `${BASE_URL}/movie/top_rated?api_key=${API_Key}&page=${page}`;

    let response = await fetch(API_URL, {method: "GET"});
    response = response.json();

    return response;
} 