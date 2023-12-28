import React from "react";
import { Button, Form, Input, message } from "antd";
import { userRegister } from "../../Services/api";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 0,
    },
    md: {
      span: 24,
    },
    xl: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
export default function FormRegister() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    let fetchDataUserRegister = async () => {
      try {
        let res = await userRegister(values);
        message.success("Đăng ký thành công");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (err) {
        message.error(err.response.data.content);
      }
    };
    fetchDataUserRegister();
  };

  return (
    <Form
      {...formItemLayout}
      layout='vertical'
      form={form}
      name='register'
      onFinish={onFinish}
      className='grid-cols-1 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-2 lg:gap-4 xl:grid-cols-2 xl:gap-4'
      style={{
        width: "100%",
      }}
      scrollToFirstError
    >
      <Form.Item
        label='Tài Khoản'
        name='taiKhoan'
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tài khoản !",
          },
        ]}
      >
        <Input placeholder='Tài khoản' />
      </Form.Item>

      <Form.Item
        name='matKhau'
        label='Mật khẩu'
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          placeholder='Mật khẩu'
          style={{
            borderRadius: 0,
            borderColor: "#6B7280",
            padding: "0.5rem 0.75rem",
          }}
        />
      </Form.Item>

      <Form.Item
        name='confirm'
        label='Nhập lại mật khẩu'
        dependencies={["matKhau"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("matKhau") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Mật khẩu mà bạn nhập không khớp!"),
              );
            },
          }),
        ]}
      >
        <Input.Password
          placeholder='Nhập lại mật khẩu'
          style={{
            borderRadius: 0,
            borderColor: "#6B7280",
            padding: "0.5rem 0.75rem",
          }}
        />
      </Form.Item>

      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: "email",
            message: "Đây không phải là email!",
          },
          {
            required: true,
            message: "Vui lòng nhập vào email!",
          },
        ]}
      >
        <Input placeholder='E-mail' />
      </Form.Item>

      <Form.Item
        name='hoTen'
        label='Họ tên'
        rules={[
          {
            required: true,
            message: "Vui lòng nhập vào Họ tên!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder='Họ tên' />
      </Form.Item>

      <Form.Item
        name='soDt'
        label='Số điện thoại'
        rules={[
          {
            required: true,
            pattern: new RegExp(/^[0-9]+$/),
            message: "Vui lòng nhập vào số điện thoại!",
          },
        ]}
      >
        <Input placeholder='Số điện thoại' />
      </Form.Item>

      <Form.Item className='col-span-2' {...tailFormItemLayout}>
        <Button
          type='undefined'
          htmlType='submit'
          className='w-full bg-orange-400 hover:bg-orange-500 duration-300 shadow-md'
        >
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
}
