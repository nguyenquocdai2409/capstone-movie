import React from "react";
import FormInput from "./FormInput";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <div
        className='flex justify-center items-center '
        style={{
          background: "url(./image/backapp.jpg) center / cover no-repeat",
          height: "100vh",
        }}
      >
        <div className='bg-white w-[80%] sm:w-2/3  md:w-1/2 lg:w-1/3 p-10 rounded-xl flex flex-col justify-between items-center '>
          <div className='text-center text-2xl w-9 h-9 leading-9 bg-orange-400 text-white rounded-full'>
            <UserOutlined />
          </div>
          <h3 className='text-center font-bold my-3 text-xl  md:text-2xl'>
            Đăng nhập
          </h3>
          <FormInput />
          <div>
            <NavLink to={"/register"}>
              <span className='text-blue-500 hover:text-blue-800 text-[0.7rem] md:text-base'>
                Bạn chưa có tài khoản ? Đăng ký ở đây!
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
