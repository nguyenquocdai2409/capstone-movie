import React from "react";
import "./pageNotFound.scss";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
export default function PageNotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div
      id='pageNotFound'
      className='flex flex-col justify-center items-center'
    >
      <h1>404</h1>
      <p className='my-16'>Oops! Something is wrong.</p>
      <div>
        <button className='button'>
          <NavLink to={"/"}>
            <i className='fa-solid fa-house-user' /> Go back in initial page, is
            better.
          </NavLink>
        </button>
      </div>
    </div>
  );
}
