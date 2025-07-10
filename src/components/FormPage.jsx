import React from "react";
import { useNavigate } from "react-router-dom";

function FormPage({ title, initialData = {}, onSubmit, children, hideActions }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(initialData);
  };

  return (
    <div style={{ maxWidth: 600, margin: "32px auto", background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
      <h2 style={{ marginBottom: 24 }}>{title}</h2>
      <form onSubmit={handleSubmit}>
        {children}
        {!hideActions && (
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button type="submit" style={{ padding: "8px 24px", background: "#1976d2", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>Lưu</button>
            <button type="button" style={{ padding: "8px 24px", background: "#eee", color: "#333", border: "none", borderRadius: 4, cursor: "pointer" }} onClick={() => navigate(-1)}>Quay lại</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default FormPage;
