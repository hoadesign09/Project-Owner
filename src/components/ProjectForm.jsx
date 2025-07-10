import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPage from "../components/FormPage";

function ProjectForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({id: "", name: "", desc: "", status: "" });

  useEffect(() => {
    if (isEdit && id) {
      // Gọi API lấy dữ liệu project theo id
      setForm({ id: id, name: `Project ${id.name}`, desc: `${id.desc}`, status: `${id.status}` });
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isEdit) {
      // Gọi API cập nhật
      alert("Cập nhật thành công!");
    } else {
      // Gọi API tạo mới
      alert("Tạo mới thành công!");
    }
    navigate(-1);
  };

  return (
    <FormPage
      title={isEdit ? `Chỉnh sửa Project #${id}` : "Tạo mới Project"}
      initialData={form}
      onSubmit={handleSubmit}
    >
      <div style={{ marginBottom: 16 }}>
        <label>Tên Project</label>
        <input name="name" value={form.name} onChange={handleChange} style={{ width: "100%" }} required />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Mô tả</label>
        <input name="desc" value={form.desc} onChange={handleChange} style={{ width: "100%" }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>Trạng thái</label>
        <select name="status" value={form.status} onChange={handleChange} style={{ width: "100%" }}>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    </FormPage>
  );
}

export default ProjectForm;