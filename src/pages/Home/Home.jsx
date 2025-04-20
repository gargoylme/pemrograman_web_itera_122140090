import React, { useState } from "react";
import { useBookContext } from "../../context/BookContext";
import BookForm from "../../components/BookForm/BookForm.jsx";
import BookList from "../../components/BookList/BookList.jsx";
import BookFilter from "../../components/BookFilter/BookFilter.jsx";

const Home = () => {
  const { books, dispatch } = useBookContext();
  const [bookToEdit, setBookToEdit] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      (!statusFilter || book.status === statusFilter) &&
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = (book) => {
    dispatch({ type: bookToEdit ? "EDIT_BOOK" : "ADD_BOOK", payload: book });
    setBookToEdit(null);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Manajemen Buku</h1>
      <BookForm onSubmit={handleSubmit} bookToEdit={bookToEdit} />
      <hr className="my-4" />
      <BookFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        search={search}
        setSearch={setSearch}
      />

      <BookList
        books={filteredBooks}
        onEdit={setBookToEdit}
        onDelete={(id) => dispatch({ type: "DELETE_BOOK", payload: id })}
      />
    </div>
  );
};

export default Home;
