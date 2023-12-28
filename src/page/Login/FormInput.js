import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { dangNhap } from "../../Services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { localService } from "../../Services/localService";
import { setInfo } from "../../redux/reducer/userReducer";

export default function FormInput() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    let logIn = async () => {
      try {
        let res = await dangNhap(values);
        dispatch(setInfo(res.data.content));
        localService.set(res.data.content);
        message.success("Đăng nhập thành công");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } catch (err) {
        message.error(err.response.data.content);
      }
    };
    logIn();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout='vertical'
      name='basic'
      labelCol={{
        span: 12,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        width: "100%",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        label='Tài khoản'
        name='taiKhoan'
        rules={[
          {
            required: true,
            message: "Vui lòng nhập vào tài khoản!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Mật khẩu'
        name='matKhau'
        rules={[
          {
            required: true,
            message: "Vui lòng nhập vào mật khẩu!",
          },
        ]}
      >
        <Input.Password
          style={{
            borderRadius: 0,
            borderColor: "#6B7280",
            padding: "0.5rem 0.75rem",
          }}
        />
      </Form.Item>

      <Form.Item
        className=' text-left'
        name='remember'
        valuePropName='checked'
        wrapperCol={{
          span: 24,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button
          type='undefined'
          htmlType='submit'
          className='bg-orange-400 hover:bg-orange-500 w-full shadow-md'
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
