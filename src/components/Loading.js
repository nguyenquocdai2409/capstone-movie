import React from "react";
import { ProgressBar } from "react-loader-spinner";
import { useSelector } from "react-redux";

export default function Loading() {
  let { isLoading } = useSelector((state) => state.spinnerSlice);
  return isLoading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `rgba(0,0,0,0.8)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <ProgressBar
        height='200'
        width='200'
        ariaLabel='progress-bar-loading'
        wrapperStyle={{}}
        wrapperClass='progress-bar-wrapper'
        borderColor='#848482'
        barColor='#FE5A1D'
      />
    </div>
  ) : (
    <></>
  );
}
