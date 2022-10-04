import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, DatePicker, Row, Col, Input } from "antd";
import { useDispatch } from "react-redux";

import { UploadFile } from "./components/Upload.js";

import "./styles.less";

const Registration = () => {
  const acceptTypes = ["", "doc", "pdf", "png", "jpeg", "docx", "jpg", "tif"];
  const acceptType = acceptTypes.join(",.");
  const [validFile, setValidFile] = useState();
  const [invalidFile, setInValidFile] = useState(false);
  const [form] = Form.useForm();

  const handleChangeFile = (name, files) => {
    console.log(files);
    // dispatch(getInfoIdImage(files));
    setInValidFile();
    // setFieldsValue({ [name]: files });
    // files &&
    //   files.map(item => {
    //     const imageBase64 = item.url.split(',')[1];
    //     return dispatch(
    //       importOCRAction({ imageBase64, face: 2 }, error => {
    //         return error ? showError(error) : setValidFile(item);
    //       }),
    //     );
    //   });
  };
  const getExtension = (filename) =>
    filename.split(".").slice(-1)[0].toLowerCase();

  const checkValidFile = (file) => {
    const extension = getExtension(file.name);
    if (acceptTypes.slice(1).includes(extension)) {
      return true;
    }
    return false;
  };
  const onFinish = () => {
    console.log(1);
  };

  return (
    <div className="registration">
      <div className="form-booking-container">
        <div className="form-intro">
          {"Xin chào, Để có thể quản lý xe ra vào kho,"}
          <br />
          {"Bạn vui lòng đăng ký thông tin trước khi vào cổng. Xin cảm ơn."}
        </div>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 0]}>
            <Col
              xs={{ span: 24 }}
              md={{ span: 18, offset: 3 }}
              lg={{ span: 12, offset: 0 }}
            >
              <div className="form-booking-title">
                {"Đăng ký nhanh bằng cách scan QR CMND"}
              </div>
              <Form.Item>
                <UploadFile
                  label="Tải ảnh lên"
                  accept={acceptType}
                  name="imgBack"
                  onChange={handleChangeFile}
                  multiple={false}
                  validFile={validFile}
                  invalidFile={invalidFile}
                  setValidFile={setValidFile}
                  checkValidFile={checkValidFile}
                />
              </Form.Item>
              <Form.Item
                label="Số CMND"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số CMND",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Vui lòng nhập số CMND"
                  type="number"
                  min={0}
                  minLength={9}
                />
              </Form.Item>
              <Form.Item
                label="Họ và tên tài xế"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số CMND",
                  },
                ]}
              >
                <Input size="large" placeholder="Vui lòng nhập Tên" />
              </Form.Item>
              <Form.Item label="Ngày tháng năm sinh">
                <DatePicker
                  size="large"
                  placeholder="Vui lòng chọn Ngày/tháng/năm sinh"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 18, offset: 3 }}
              lg={{ span: 12, offset: 0 }}
            >
              <Form.Item label="Quê quán">
                <Input size="large" placeholder="Vui lòng nhập Quê quán" />
              </Form.Item>
              <Form.Item label="Ngày hiệu lực">
                <DatePicker
                  size="large"
                  placeholder="Vui lòng chọn Ngày hiệu lực"
                />
              </Form.Item>
              <Form.Item label="Thời gian vào cổng">
                <DatePicker
                  showTime={true}
                  size="large"
                  placeholder="Vui lòng chọn thời gian vào"
                />
              </Form.Item>
              <Form.Item label="Ngày hiệu ra cổng">
                <DatePicker
                  size="large"
                  showTime={true}
                  placeholder="Vui lòng chọn thời gian ra"
                />
              </Form.Item>
            </Col>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                borderRadius: "8px",
                width: "200px",
                height: "40px",
                background: "rgb(255, 94, 31)",
                borderColor: "rgb(255, 94, 31)",
              }}
            >
              Gửi thông tin
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
