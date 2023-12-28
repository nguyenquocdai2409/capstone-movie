import React from "react";
import FormRegister from "./FormRegister";
import { UnlockOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function Register() {
  return (
    <div
      className='w-full h-[100vh] flex justify-center items-center '
      style={{
        background: "url(./image/backapp.jpg) center / cover no-repeat",
      }}
    >
      <div className='w-[85%] md:w-[600px] lg:w-[800px] h-fit relative rounded-sm md:rounded-lg bg-white'>
        <div className='' style={{ padding: "20px 32px 30px" }}>
          <div>
            <div className='flex justify-center'>
              <div className='text-center text-2xl w-9 h-9 leading-9 bg-orange-400 text-white rounded-full'>
                <UnlockOutlined />
              </div>
            </div>
            <h3 className='text-center font-bold my-3 text-xl  md:text-2xl'>
              Đăng ký
            </h3>
          </div>
          <FormRegister />
          <div className='text-center'>
            <NavLink to={"/login"}>
              <span className='text-blue-500 hover:text-blue-800 text-[0.7rem] md:text-base'>
                Bạn đã có tài khoản ? Đăng nhập ở đây!
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
