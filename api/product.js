import { BASE_PATH } from "../utils/constants";

export async function getLastProductsApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    //const shortItems = "_short=createdAT:desc";
    const url = `${BASE_PATH}/products?${limitItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
/* use categories.slug for server strapi*/
export async function getProductsCategoryApi(category, limit, start) {
  try {
    const limitItems = `_limit=${limit}`;
    //const sortItems = ' _sort=createdAt:desc';
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/products?categories.url=${category}&${limitItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTotalProductsCategoryApi(category) {
  try {
    const url = `${BASE_PATH}/products/count?categories.url=${category}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductbyUrlApi(path) {
  try {
    const url = `${BASE_PATH}/products?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function seachProductApi(title) {
  try {
    const url = `${BASE_PATH}/products?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
