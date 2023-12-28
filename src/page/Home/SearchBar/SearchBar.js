import React, { Fragment, useEffect, useState } from "react";
import { getInfoShowtimes, getListMovie } from "../../../Services/api";
import moment from "moment/moment";
import { useNavigate, NavLink } from "react-router-dom";
import "./searchBar.scss";
import { Popover, Select } from "antd";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function SearchBar() {
  const [listMovie, setListMovie] = useState([]);
  const [lichChieuPhim, setLichChieuPhim] = useState({});
  const [movieSelected, setMovieSelected] = useState(null);
  const [maLichChieu, setMaLichChieu] = useState(null);
  const [maCumRap, setMaCumRap] = useState(null);
  const [disableBtn, setDisableBtn] = useState(true);
  const [classBtnBuy, setClassBtnBuy] = useState("cursor-no-drop bg-zinc-500 text-white");

  let navigate = useNavigate();
  const infoNgayChieu = [];
  const { info } = useSelector((state) => state.userReducer);
  //search tên phim
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  useEffect(() => {
    let fetchData = async () => {
      try {
        let res = await getListMovie();
        setListMovie(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  let renderListMovie = () => {
    return listMovie?.map((item, index) => {
      return (
        <Fragment key={index}>
          <Select.Option
            className='text-xs font-bold sm:text-sm md:text-base'
            value={item.maPhim}
            label={item.tenPhim}>
            <Popover
              trigger='hover'
              placement='right'
              content={
                <div className='relative'>
                  <img loading='lazy' src={item.hinhAnh} width={150} alt='...' />
                  <NavLink to={`/detail/${item.maPhim}`}>
                    <button className='absolute left-1/2 bottom-0 translate-x-[-50%] rounded  px-3 py-1 bg-orange-400 text-white hover:bg-orange-500 duration-300'>
                      <span>Detail</span>
                    </button>
                  </NavLink>
                </div>
              }>
              <div>{item.tenPhim}</div>
            </Popover>
          </Select.Option>
        </Fragment>
      );
    });
  };
  let handleChange = (value) => {
    setMovieSelected(value);
    setMaCumRap(null);
    setMaLichChieu(null);
    if (value !== 0) {
      setClassBtnBuy("cursor-no-drop bg-zinc-500 text-white");
      setDisableBtn(true);
    }
    let fetchInfoShowtimes = async () => {
      try {
        let res = await getInfoShowtimes(value);
        setLichChieuPhim(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchInfoShowtimes();
  };
  let renderLichChieuPhim = () => {
    return lichChieuPhim.heThongRapChieu?.map((item, index) => {
      return (
        <Fragment key={index}>
          {item.cumRapChieu?.map((tenRap, index) => {
            infoNgayChieu.push(tenRap);
            return (
              <Fragment key={index}>
                <Select.Option
                  className='text-xs font-bold sm:text-sm md:text-base'
                  value={tenRap.maCumRap}>
                  {tenRap.tenCumRap}
                </Select.Option>
              </Fragment>
            );
          })}
        </Fragment>
      );
    });
  };
  let handleChangeLichChieu = (value) => {
    setMaCumRap(value);
    setMaLichChieu(null);
  };
  let renderNgayChieu = () => {
    return infoNgayChieu?.map((item, index) => {
      if (item.maCumRap === maCumRap) {
        return (
          <Fragment key={index}>
            {item.lichChieuPhim?.map((ngayChieu, index) => {
              return (
                <Fragment key={index}>
                  <Select.Option
                    className='text-xs font-bold sm:text-sm md:text-base'
                    value={ngayChieu.maLichChieu}>
                    {moment(ngayChieu.ngayChieuGioChieu).format("lll")}
                  </Select.Option>
                </Fragment>
              );
            })}
          </Fragment>
        );
      }
    });
  };

  let handleChangeNgayChieu = (value) => {
    setMaLichChieu(value);
    if (value !== 0) {
      setClassBtnBuy("bg-orange-500 hover:bg-orange-600 cursor-pointer");
      setDisableBtn(false);
    } else {
      setClassBtnBuy("cursor-no-drop bg-zinc-500 text-white");
      setDisableBtn(true);
    }
  };
  let handleCheckingLogin = () => {
    if (info) {
      navigate(`/ticketroom/${maLichChieu}`);
    } else {
      Swal.fire({
        title: "Please log in to your account",
        icon: "error",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        showDenyButton: true,
        denyButtonText: `Cancel`,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <div
      style={{
        zIndex: "10",
      }}
      id='searchBar'
      className='shadow-xl h-12 md:h-20 rounded flex items-center p-4 md:p-2 bg-white absolute md:w-[80%] lg:w-[60%] lg:left-[20%] left-[10%] md:left-[10%] top-[92%] '>
      <div id='movieName' className='w-[30%]'>
        <Select
          defaultValue={"Tìm phim..."}
          allowClear={true}
          onChange={handleChange}
          bordered={false}
          showSearch={true}
          filterOption={filterOption}
          className='w-full font-bold text-xs sm:text-sm md:text-base text'>
          <Select.Option value={0}>Phim</Select.Option>
          {renderListMovie()}
        </Select>
      </div>
      <div id='cinemaComplex' style={{ width: "25%" }}>
        <Select
          disabled={movieSelected === null}
          allowClear={true}
          bordered={false}
          onChange={handleChangeLichChieu}
          value={{
            label: maCumRap === null ? "Chọn rạp phim" : maCumRap.tenCumRap,
            value: maCumRap,
          }}
          className='w-full font-bold text-xs sm:text-sm md:text-base'>
          <Select.Option value={0}>Cụm rạp</Select.Option>
          {renderLichChieuPhim()}
        </Select>
      </div>
      <div id='showTimes' style={{ width: "25%" }}>
        <Select
          allowClear={true}
          bordered={false}
          disabled={maCumRap === null}
          value={{
            label: maLichChieu === null ? "Chọn suất chiếu" : maLichChieu.ngayChieuGioChieu,
            value: maLichChieu,
          }}
          onChange={handleChangeNgayChieu}
          className='w-full  text-xs sm:text-sm md:text-base'>
          <Select.Option value={0}>Lịch chiếu</Select.Option>
          {renderNgayChieu()}
        </Select>
      </div>
      <div style={{ width: "20%" }}>
        <button
          onClick={handleCheckingLogin}
          disabled={disableBtn}
          className={`ml-3 py-2 font-bold rounded ${classBtnBuy} duration-300 text-xs md:text-base`}
          style={{ width: "80%" }}>
          Mua vé
        </button>
      </div>
    </div>
  );
}
