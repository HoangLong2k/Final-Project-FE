import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDataAdmin } from "../../stores/user";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAdmin());
  }, []);

  const dataSourceAdmin = useSelector(({ user }) => {
    return user.admin
      .filter((item) => {
        return item.role === "user";
      })
      .map((item) => {
        return { ...item.dataSubmitted[0] };
      });
  });

  const columns = [
    { title: "Họ tên", dataIndex: "owner", key: "owner" },
    { title: "CMND", dataIndex: "idNumber", key: "idNumber" },
    { title: "SĐT", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Ngày đang ký", dataIndex: "effectiveDate", key: "effectiveDate" },
    { title: "Biển số", dataIndex: "trafficNumber", key: "trafficNumber" },
    {
      title: "Loại phương tiện",
      dataIndex: "typeOfVehicle",
      key: "typeOfVehicle",
    },
    { title: "Thời gian vào", dataIndex: "timeIn", key: "timeIn" },
    { title: "Thời gian rời", dataIndex: "timeOut", key: "timeOut" },
  ];

  return (
    <div className="admin-container">
      <Table columns={columns} dataSource={dataSourceAdmin} />
    </div>
  );
};

export default Admin;
