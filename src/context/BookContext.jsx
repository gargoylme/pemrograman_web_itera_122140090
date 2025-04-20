import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BookContext = createContext();

const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.payload];
    case "EDIT_BOOK":
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    case "DELETE_BOOK":
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [storedBooks, setStoredBooks] = useLocalStorage("books", []);
  const [books, dispatch] = useReducer(bookReducer, storedBooks);

  useEffect(() => {
    setStoredBooks(books);
  }, [books]);

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
