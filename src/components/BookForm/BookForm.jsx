import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const BookForm = ({ onSubmit, bookToEdit }) => {
  const [form, setForm] = useState({ title: "", author: "", status: "milik" });

  useEffect(() => {
    if (bookToEdit) setForm(bookToEdit);
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      alert("Judul dan penulis wajib diisi!");
      return;
    }
    const book = { ...form, id: form.id || Date.now() };
    onSubmit(book);
    setForm({ title: "", author: "", status: "milik" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow rounded-lg space-y-3"
    >
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Judul Buku"
        className="input-field"
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Penulis"
        className="input-field"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="input-field"
      >
        <option value="milik">Dimiliki</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
      <button type="submit" className="btn-primary w-full">
        Simpan
      </button>
    </form>
  );
};

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  bookToEdit: PropTypes.object,
};

export default BookForm;
