import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "../assets/css/table.css";

function Table({ columns = [], data = [], loading, error, pageSize = 10, onEdit, onDelete }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

  // Thêm cột Action vào cuối bảng
  const allColumns = [...columns, { key: "_action", title: "Action" }];

  return (
    <div className="custom-table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {allColumns.map((col) => (
              <th key={col.key}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={allColumns.length} style={{ textAlign: "center" }}>
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td
                colSpan={allColumns.length}
                style={{ textAlign: "center", color: "red" }}
              >
                {error}
              </td>
            </tr>
          ) : pagedData.length === 0 ? (
            <tr>
              <td colSpan={allColumns.length} style={{ textAlign: "center" }}>
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            pagedData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                <td key="_action" style={{ textAlign: "left" }}>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: 8,
                    }}
                    title="Edit"
                    onClick={() => onEdit && onEdit(row)}
                  >
                    <FaEdit color="#1976d2" />
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Delete"
                    onClick={() => onDelete && onDelete(row)}
                  >
                    <FaTrash color="#e53935" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "16px 0",
            alignItems: "center",
            gap: 12,
          }}
        >
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            style={{
              background: "none",
              border: "none",
              cursor: page === 1 ? "not-allowed" : "pointer",
              padding: 0,
              marginRight: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <IoIosArrowBack color={page === 1 ? "#ccc" : "#1976d2"} size={22} />
          </button>
          <span style={{ minWidth: 60, textAlign: "center", fontWeight: 500 }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            style={{
              background: "none",
              border: "none",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              padding: 0,
              marginLeft: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <IoIosArrowForward color={page === totalPages ? "#ccc" : "#1976d2"} size={22} />
          </button>
        </div>
      )}
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
