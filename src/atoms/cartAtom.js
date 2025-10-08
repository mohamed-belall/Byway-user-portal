// atoms/cartAtom.js
import { atom } from "jotai";

const localStorageKey = "lms-cart";

export const defaultCart = {
  subtotal: 0,
  tax: 0,
  total: 0,
  items: []
};

// Load cart from localStorage (or empty array if none)
const storedCart = JSON.parse(localStorage.getItem(localStorageKey)) || defaultCart;

export const cartAtom = atom(storedCart);

// writeable atom that auto-saves to localStorage
export const cartWithPersistenceAtom = atom(
  (get) => get(cartAtom),
  (get, set, update) => {
    const newCart = typeof update === "function" ? update(get(cartAtom)) : update;
    set(cartAtom, newCart);
    localStorage.setItem(localStorageKey, JSON.stringify(newCart));
  }
);
