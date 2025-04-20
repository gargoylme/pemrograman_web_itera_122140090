import React from "react";
import PropTypes from "prop-types";

const BookFilter = ({ statusFilter, setStatusFilter, search, setSearch }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="input-field"
      >
        <option value="">Semua</option>
        <option value="milik">Dimiliki</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari judul atau penulis..."
        className="input-field flex-1"
      />
    </div>
  );
};

BookFilter.propTypes = {
  statusFilter: PropTypes.string.isRequired,
  setStatusFilter: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default BookFilter;
