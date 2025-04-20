import React from "react";
import PropTypes from "prop-types";

const BookList = ({ books, onEdit, onDelete }) => {
  if (books.length === 0) return <p>Tidak ada buku.</p>;

  return (
    <ul className="grid md:grid-cols-2 gap-4">
      {books.map((book) => (
        <li key={book.id} className="bg-white p-4 shadow rounded-lg relative">
          <span
            className={`status-tag absolute top-2 right-2 
            ${book.status === "milik" && "status-milik"}
            ${book.status === "baca" && "status-baca"}
            ${book.status === "beli" && "status-beli"}
          `}
          >
            {book.status}
          </span>
          <h2 className="font-semibold text-lg">{book.title}</h2>
          <p className="text-gray-600 mb-2">{book.author}</p>
          <div className="flex gap-2">
            <button onClick={() => onEdit(book)} className="btn-secondary">
              Edit
            </button>
            <button onClick={() => onDelete(book.id)} className="btn-danger">
              Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
