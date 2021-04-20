import {BASE_PATH} from "../utils/constants";

export async function getCategoriesApi(limit){
    try {
        const limitItems = `_limit=${limit}`;
        const url =`${BASE_PATH}/categories?${limitItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
