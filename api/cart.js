import { size, includes, remove } from "lodash";
import { toast } from "react-toastify";
import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export function getProductsCart() {
  const cart = localStorage.getItem(CART);

  if (!cart) {
    return null;
  } else {
    const products = cart.split(",");
    return products;
  }
}

export function addProductCart(product) {
  const cart = getProductsCart();

  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Product has been successfully added to your shopping cart");
  } else {
    const productFound = includes(cart, product);
    if (productFound) {
      toast.warning("This product is already in your shopping cart");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success(
        "Product has been successfully added to your shopping cart"
      );
    }
  }
}

export function countProductCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart();

  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
}

export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createdAt;

    const url = `${BASE_PATH}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removeAllProductCart() {
  localStorage.removeItem(CART);
}
