import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import FormPage from "../components/FormPage";

function ProjectForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("view") || query.get("edit");
  const isView = !!query.get("view");
  const isEdit = !!query.get("edit");

  const [form, setForm] = useState({ id: "", name: "", desc: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ((isEdit || isView) && id) {
      setLoading(true);
      axios.get(`http://localhost:3333/api/projects/${id}`)
        .then(res => {
          const data = res.data;
          setForm({
            id: data.id,
            name: data.name,
            desc: data.description,
            status: data.status,
          });
          setLoading(false);
        })
        .catch(err => {
          setError("Không tìm thấy project!");
          setLoading(false);
        });
    }
  }, [isEdit, isView, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:3333/api/projects/edit/${id}`, {
          name: form.name,
          description: form.desc,
          status: form.status,
        });
        alert("Cập nhật thành công!");
      } else {
        await axios.post("http://localhost:3333/api/projects/new", {
          name: form.name,
          description: form.desc,
          status: form.status,
        });
        alert("Tạo mới thành công!");
      }
      navigate(`/projects`);
    } catch (err) {
      alert("Có lỗi xảy ra!" + (err?.response?.data?.message || ""));
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Bạn có chắc muốn xóa ${form.name}?`)) {
      try {
        alert("Đã xóa: " + form.name);
        await axios.delete(`http://localhost:3333/api/projects/delete/${id}`);
        navigate(`/projects`);
      } catch (err) {
        alert("Lỗi khi xóa!");
      }
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <FormPage
      title={isView ? `Chi tiết ${form.name} #${id}` : isEdit ? `Chỉnh sửa ${form.name} #${id}` : "Tạo mới dự án "}
      initialData={form}
      onSubmit={isView ? undefined : handleSubmit}
      hideActions={isView}
    >
      <div style={{ marginBottom: 16 }}>
        <label>Tên Project</label>
        <input name="name" value={form.name} onChange={handleChange} style={{ width: "100%" }} required disabled={isView} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Mô tả</label>
        <input name="desc" value={form.desc} onChange={handleChange} style={{ width: "100%" }} disabled={isView} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Trạng thái</label>
        <select name="status" value={form.status} onChange={handleChange} style={{ width: "100%" }} disabled={isView}>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>
      </div>
      {isView && (
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button onClick={() => navigate(`/project?edit=${id}`)} style={{ padding: "8px 24px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Sửa</button>
          <button onClick={() => handleDelete(form)} style={{ padding: "8px 24px", background: "#d32f2f", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Xóa</button>
          <button onClick={() => navigate(-1)} style={{ padding: "8px 24px", background: "#eee", color: "#333", border: "none", borderRadius: 4, cursor: "pointer" }}>Quay lại</button>
        </div>
      )}
    </FormPage>
  );
}

export default ProjectForm;