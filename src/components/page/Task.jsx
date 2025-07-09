import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Table";

const columns = [
  { key: "id", title: "ID" },
  { key: "name", title: "Task Name" },
  { key: "status", title: "Status" },
  // Thêm các cột khác nếu cần
];

function Task() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Table columns={columns} data={data} loading={loading} error={error} />
  );
}

export default Task;
