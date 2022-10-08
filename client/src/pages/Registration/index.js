import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  DatePicker,
  Row,
  Col,
  Input,
  Select as AntSelect,
  Select,
} from "antd";
import { registration } from "../../stores/user";
import { useDispatch, useSelector } from "react-redux";

import { UploadFile } from "./components/Upload.js";
import { useNavigate } from "react-router-dom";
import { dateToString } from "../../utils/utils";

import "./styles.less";
import { RoutePaths } from "../../utils/constant";

const { Option } = AntSelect;

const Registration = () => {
  const acceptTypes = ["", "doc", "pdf", "png", "jpeg", "docx", "jpg", "tif"];
  const validateMessages = {
    required: "Vui lòng nhập thông tin",
  };
  const OPTION_VIHICLE = [
    {
      name: "Xe tải",
      value: "truck",
    },
    {
      name: "Xe máy",
      value: "motorbike",
    },
    {
      name: "Ôto",
      value: "car",
    },
  ];
  const acceptType = acceptTypes.join(",.");
  const [validFile, setValidFile] = useState();
  const [invalidFile, setInValidFile] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dataSubmitted = useSelector(({ user }) => {
    return user.dataSubmitted;
  });

  useEffect(() => {
    if (dataSubmitted) {
      form.setFieldsValue({
        ...dataSubmitted,
        dob: undefined,
        effectiveDate: undefined,
        timeIn: undefined,
        timeOut: undefined,
      });
      setDisabled(true);
    }
  }, [dataSubmitted]);

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
  const onFinish = (value) => {
    const formatValue = {
      ...value,
      dob: dateToString(value.dob, "DD-MM-YYYY"),
      effectiveDate: dateToString(value.effectiveDate, "DD-MM-YYYY"),
      timeIn: dateToString(value.timeIn, "hh:mm DD-MM-YYYY"),
      timeOut: dateToString(value.timeOut, "hh:mm DD-MM-YYYY"),
    };
    dispatch(
      registration(formatValue, () => {
        // navigate(RoutePaths.QR);
      })
    );
    console.log(formatValue);
  };

  return (
    <div className="registration">
      <div className="form-booking-container">
        <div className="form-intro">
          {"Xin chào, Để có thể quản lý xe ra vào kho,"}
          <br />
          {"Bạn vui lòng đăng ký thông tin trước khi vào cổng. Xin cảm ơn."}
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
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
                name="idNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  disabled={disabled}
                  size="large"
                  placeholder="Vui lòng nhập số CMND"
                  type="number"
                  maxLength={12}
                />
              </Form.Item>
              <Form.Item
                label="Họ và tên tài xế"
                name="owner"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Vui lòng nhập tên tài xế"
                  disabled={disabled}
                />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Vui lòng nhập số điện thoại"
                  type="number"
                  min={0}
                  minLength={10}
                  disabled={disabled}
                />
              </Form.Item>
              <Form.Item
                label="Ngày tháng năm sinh"
                name="dob"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabled={disabled}
                  format={"DD-MM-YYYY"}
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
              <Form.Item
                label="Ngày hiệu lực"
                name="effectiveDate"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabled={disabled}
                  format={"DD-MM-YYYY"}
                  size="large"
                  placeholder="Vui lòng chọn Ngày hiệu lực"
                />
              </Form.Item>
              <Form.Item
                label="Thời gian vào cổng"
                name="timeIn"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabled={disabled}
                  format={"hh:mm DD-MM-YYYY"}
                  showTime={true}
                  size="large"
                  placeholder="Vui lòng chọn thời gian vào cổng"
                />
              </Form.Item>
              <Form.Item
                label="Thời gian ra cổng"
                name="timeOut"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker
                  disabled={disabled}
                  format={"hh:mm DD-MM-YYYY"}
                  size="large"
                  showTime={true}
                  placeholder="Vui lòng chọn thời gian ra cổng"
                />
              </Form.Item>
              <Form.Item
                label="Loại phương tiện"
                name="typeOfVehicle"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Vui lòng chọn phương tiện"
                  size="large"
                  disabled={disabled}
                >
                  {OPTION_VIHICLE.map((item, index) => {
                    return (
                      <Option key={index} value={item.value}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Biển số xe"
                name="trafficNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Vui lòng nhập biển số xe"
                  disabled={disabled}
                />
              </Form.Item>
            </Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabled}
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
