import React, { useEffect, useState } from "react";
import { getMovieTheater } from "../../../Services/api";
import { Collapse, Tabs } from "antd";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn, handleLoadingOff } from "../../../redux/reducer/spinnerSlice";

export default function TabsMovieMobile() {
  const [danhSachHeThongRap, setDanhSachHeThongRap] = useState([]);
  let dispatch = useDispatch();
  const { info } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(handleLoadingOn());
    let fetchDataMovieTheater = async () => {
      try {
        let res = await getMovieTheater();
        setDanhSachHeThongRap(res.data.content);
        setTimeout(() => {
          dispatch(handleLoadingOff());
        }, 1000);
      } catch (err) {
        dispatch(handleLoadingOff());
      }
    };
    fetchDataMovieTheater();
  }, [dispatch]);
  let handleRenderLichChieu = (dsPhim) => {
    return dsPhim.map((phim, index) => {
      return (
        <div key={index} className='mb-4 pb-5 border-b-2 border-b-zinc-200'>
          <div className='flex items-center mb-5'>
            <img loading='lazy' src={phim.hinhAnh} style={{ width: 60 }} alt={phim.hinhAnh} />
            <div className='ml-5'>
              <p className='text-base md:text-lg lg:text-xl font-semibold '>{phim.tenPhim}</p>
              <p>120 Phút</p>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 '>
            {phim.lstLichChieuTheoPhim.slice(0, 8).map((gioChieu, index) => {
              return (
                <NavLink key={index} to={info ? `/ticketroom/${gioChieu.maLichChieu}` : `/login`}>
                  <div
                    id='btnDatVe'
                    style={{
                      borderColor: "#e4e4e4",
                      background: `rgba(246,246,246,0.5)`,
                    }}
                    className='font-semibold  px-3 py-1 text-center border duration-300 hover:scale-105 cursor-pointer'>
                    <span className='text-gray-400'>
                      {moment(gioChieu.ngayChieuGioChieu).format("LL")}
                    </span>
                    <span> - </span>
                    <span className='text-green-500 gioChieu'>
                      {moment(gioChieu.ngayChieuGioChieu).format("LT")}
                    </span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      );
    });
  };
  let handleRenderHeThongRap = () => {
    return danhSachHeThongRap.map((heThongRap, index) => {
      return {
        key: index,
        label: <img src={heThongRap.logo} className='w-16' alt={heThongRap.logo} />,
        children: (
          <Collapse
            defaultActiveKey={["1"]}
            items={heThongRap.lstCumRap.map((cumRap, index) => {
              return {
                key: cumRap.maCumRap,
                label: (
                  <div className='text-left' key={index}>
                    <p className='text-green-400 font-semibold text-xl hover:text-green-700 duration-300'>
                      {cumRap.tenCumRap}
                    </p>

                    <span className='text-gray-300'>{cumRap.diaChi}</span>
                  </div>
                ),
                children: (
                  <div className='listPhim p-3' style={{ height: 800, overflow: "auto" }}>
                    {handleRenderLichChieu(cumRap.danhSachPhim)}
                  </div>
                ),
              };
            })}
          />
        ),
      };
    });
  };
  return (
    <div id='cinema__complex' className='container'>
      <Tabs
        centered
        className='shadow-lg md:h-[800px]'
        style={{ border: "1px solid #ccc" }}
        tabPosition='left'
        defaultActiveKey='1'
        items={handleRenderHeThongRap()}
      />
    </div>
  );
}
