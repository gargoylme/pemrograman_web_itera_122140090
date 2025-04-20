import { useMemo } from "react";
import { useBookContext } from "../context/BookContext";

export const useBookStats = () => {
  const { books } = useBookContext();

  return useMemo(() => {
    const stats = { milik: 0, baca: 0, beli: 0 };
    books.forEach((book) => {
      if (book.status === "milik") stats.milik++;
      if (book.status === "baca") stats.baca++;
      if (book.status === "beli") stats.beli++;
    });
    return stats;
  }, [books]);
};
