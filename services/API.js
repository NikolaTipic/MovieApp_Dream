import { API_Key, BASE_URL } from "../components/config"

export const GET = async (url) => {
    const API_URL = `${BASE_URL}${url}?api_key=${API_Key}`;

    let response = await fetch(API_URL, {method: "GET"});
    response = response.json();

    return response;
} 