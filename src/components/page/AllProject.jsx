import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import Table from "../Table";
import jsPDF from "jspdf";
import { autoTable } from 'jspdf-autotable';

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Project Name" },
  { key: "description", title: "Description" },
  { key: "total_tasks", title: "Tasks" },
  { key: "completed_tasks", title: "Tasks Completed" },
  { key: "status", title: "Status" },
];

function AllProject() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/projects") // Thay bằng API thực tế
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (row) => {
    if (window.confirm(`Bạn có chắc muốn xóa ${row.name}?`)) {
      try {
        await axios.delete(`http://localhost:3333/api/projects/delete/${row.id}`);
        setData((prev) => prev.filter((item) => item.id !== row.id));
        alert("Đã xóa: " + row.name);
      } catch (err) {
        alert("Lỗi khi xóa!");
      }
    }
  };

  const handleView = (row) => {
    navigate(`/project?view=${row.id}`);
  };

  const handleEdit = (row) => {
    navigate(`/project?edit=${row.id}`);
  };

  // Click vào id cũng chuyển sang trang view
  const columnsWithIdLink = columns.map((col) =>
    col.key === "id"
      ? {
          ...col,
          render: (value, row) => (
            <span
              style={{ color: "#1976d2", cursor: "pointer", textDecoration: "none" }}
              onClick={() => handleView(row)}
            >
              {value}
            </span>
          ),
        }
      : col
  );

  const exportToPDF = (data) => {
    // Hàm xuất dữ liệu sang PDF
    const doc = new jsPDF();
    doc.text("Danh sách Projects", 20, 20);
    autoTable(doc, {
      head: [["ID", "Name", "Description", "Status"]],
      body: data.map(item => [item.id, item.name, item.description, item.status]),
    }); 
    doc.save("projects.pdf");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Link to="/project?new">
          <button style={{ padding: "8px 24px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
            + Thêm mới Project
          </button>
        </Link>
        <div>
          <button onClick={() => exportToPDF(data)}>Xuất file PDF</button>
        </div>
      </div>
      <Table
        columns={columnsWithIdLink}
        data={data}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AllProject;
