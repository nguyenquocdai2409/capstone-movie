import React, { useEffect, useState } from "react";
import { getMovieTheater } from "../../../Services/api";
import { Popover, Tabs } from "antd";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
import "./tabsMovie.scss";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOff, handleLoadingOn } from "../../../redux/reducer/spinnerSlice";

export default function TabsMovieDesktop() {
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
            <img loading='lazy' src={phim.hinhAnh} style={{ width: 60 }} alt='...' />
            <div className='ml-5'>
              <p className='md:text-lg lg:text-xl font-semibold '>{phim.tenPhim}</p>
              <p>120 Phút</p>
            </div>
          </div>
          <div className='grid grid-cols-1  md:gap-3 lg:grid-cols-2 lg:gap-4 xl:gap-5'>
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
        label: <img src={heThongRap.logo} className='w-16' alt='...' />,
        children: (
          <Tabs
            style={{ height: 600 }}
            className='pl-0'
            tabPosition='left'
            defaultActiveKey='1'
            items={heThongRap.lstCumRap.map((cumRap, index) => {
              return {
                key: cumRap.tenCumRap,
                label: (
                  <div className='text-left ' key={index}>
                    <p
                      style={{ color: "#108f3e" }}
                      className='text-green-500 text-left font-semibold md:text-base lg:text-lg hover:text-green-700 duration-300'>
                      {cumRap.tenCumRap}
                    </p>
                    <Popover content={<span className='text-gray-400'>{cumRap.diaChi}</span>}>
                      <span className='text-gray-300'>
                        {cumRap.diaChi.length > 30
                          ? cumRap.diaChi.slice(0, 30) + "..."
                          : cumRap.diaChi}
                      </span>
                    </Popover>
                  </div>
                ),
                children: (
                  <div className='listPhim p-3 overflow-y-scroll' style={{ height: 600 }}>
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
    <div id='cinema__complex' className='containerTabs'>
      <Tabs
        className='shadow-xl rounded'
        style={{ border: "1px solid #ccc" }}
        tabPosition='left'
        defaultActiveKey='1'
        items={handleRenderHeThongRap()}
      />
    </div>
  );
}
