// atoms/cartAtom.js
import { atom } from "jotai";

const localStorageKey = "lms-cart";

export const defaultCart = {
  subtotal: 0,
  tax: 0,
  total: 0,
  items: []
};


const storedCart = JSON.parse(localStorage.getItem(localStorageKey)) || defaultCart;

export const cartAtom = atom(storedCart);


export const cartWithPersistenceAtom = atom(
  (get) => get(cartAtom),
  (get, set, update) => {
    const newCart = typeof update === "function" ? update(get(cartAtom)) : update;
    set(cartAtom, newCart);
    localStorage.setItem(localStorageKey, JSON.stringify(newCart));
  }
);
