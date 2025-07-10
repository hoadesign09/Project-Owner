import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Table from "../Table";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Project Name" },
  { key: "desc", title: "Description" },
  { key: "total_task", title: "Tasks" },
  { key: "total_member", title: "Members" },
  { key: "total_task_done", title: "Tasks Completed" },
  { key: "status", title: "Status" },
  // Thêm các cột khác nếu cần
];

const demoData = [
  { id: 2025070512, name: "Project Alpha", status: "Active" },
  { id: 2025070511, name: "Project Beta", status: "Completed" },
  { id: 2025070510, name: "Project Gamma", status: "Pending" },
  { id: 2025070509, name: "Project Alpha", status: "Active" },
  { id: 2025070508, name: "Project Beta", status: "Completed" },
  { id: 2025070507, name: "Project Gamma", status: "Pending" },
  { id: 2025070506, name: "Project Alpha", status: "Active" },
  { id: 2025070505, name: "Project Beta", status: "Completed" },
  { id: 2025070504, name: "Project Gamma", status: "Pending" },
  { id: 2025070503, name: "Project Alpha", status: "Active" },
  { id: 2025070502, name: "Project Beta", status: "Completed" },
  { id: 2025070501, name: "Project Gamma", status: "Pending" },
  { id: 2025070500, name: "Project Alpha", status: "Active" },
  { id: 2025070499, name: "Project Beta", status: "Completed" },
  { id: 2025070498, name: "Project Gamma", status: "Pending" },
  { id: 2025070500, name: "Project Alpha", status: "Active" },
  { id: 2025070499, name: "Project Beta", status: "Completed" },
  { id: 2025070498, name: "Project Gamma", status: "Pending" },
  { id: 2025070497, name: "Project Alpha", status: "Active" },
  { id: 2025070496, name: "Project Beta", status: "Completed" },
  { id: 2025070495, name: "Project Gamma", status: "Pending" },
  { id: 2025070494, name: "Project Alpha", status: "Active" },
  { id: 2025070493, name: "Project Beta", status: "Completed" },
  { id: 2025070492, name: "Project Gamma", status: "Pending" },
  { id: 2025070491, name: "Project Alpha", status: "Active" },
  { id: 2025070490, name: "Project Beta", status: "Completed" },
  { id: 2025070489, name: "Project Gamma", status: "Pending" }
];

function AllProject() {
  const [data, setData] = useState(demoData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://your-api-url.com/projects") // Thay bằng API thực tế
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu");
        setLoading(false);
      });
  }, []);

  const handleDelete = (row) => {
    // Xử lý khi bấm delete, ví dụ xác nhận rồi xóa
    if (window.confirm(`Bạn có chắc muốn xóa ${row.name}?`)) {
      // Gọi API xóa hoặc cập nhật state
      alert("Đã xóa: " + row.name);
    }
  };

  const handleEdit = (row) => {
    navigate(`/projects/edit/${row.id}`);
  };

  // Click vào id cũng chuyển sang trang edit
  const columnsWithIdLink = columns.map((col) =>
    col.key === "id"
      ? {
          ...col,
          render: (value, row) => (
            <span
              style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
              onClick={() => handleEdit(row)}
            >
              {value}
            </span>
          ),
        }
      : col
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Link to="/projects/new">
          <button style={{ padding: "8px 24px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            + Thêm mới Project
          </button>
        </Link>
      </div>
      <Table
        columns={columnsWithIdLink}
        data={demoData}
        // loading={loading}
        // error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AllProject;
