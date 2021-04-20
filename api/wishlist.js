import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash"

export async function isWishlistAPI(idUser, idProduct, logout) {
  try {
    const url = `${BASE_PATH}/wishlists?user=${idUser}&product=${idProduct}`;
    return await authFetch(url, null, logout);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addWishlistApi(idUser, idProduct, logout) {
  try {
      const dataFound = await isWishlistAPI(idUser, idProduct, logout);
      if(size(dataFound) > 0 || !dataFound) {
          return " This product is already in your Wishlist";
      }else {
          const url = `${BASE_PATH}/whishlists`;
          const params = {
              method: "POST",
              headers:{
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ user: idUser, product: idProduct }),
          };
          const result = await authFetch(url, params, logout);
          return result;
      }
  } catch (error) {
    console.log(error);
    return null;
  }
}
