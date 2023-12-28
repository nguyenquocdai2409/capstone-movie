import React, { Fragment, useEffect, useState } from "react";
import { getInfoMovie, getInfoShowtimes } from "../../Services/api";
import { Collapse } from "antd";
import { Tabs } from "antd";
import moment from "moment/moment";
import { NavLink, useParams } from "react-router-dom";
import "./info.scss";
import ReactPlayer from "react-player";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn, handleLoadingOff } from "../../redux/reducer/spinnerSlice";
export default function InfoMovieMobile() {
  const param = useParams();
  const [infoMovie, setInfoMovie] = useState({});
  const [infoShowTime, setInfoShowTime] = useState({});
  const [open, setOpen] = useState(false);
  const { info } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(handleLoadingOn());
    let fetchDataInfoMovie = async () => {
      try {
        let res = await getInfoMovie(param.id);
        setInfoMovie(res.data.content);
        setTimeout(() => {
          dispatch(handleLoadingOff());
        }, 1000);
      } catch (err) {
        dispatch(handleLoadingOff());
      }
    };
    fetchDataInfoMovie();
  }, [dispatch, param.id]);
  useEffect(() => {
    let fetchDataInfoShowtimes = async () => {
      try {
        let res = await getInfoShowtimes(param.id);
        setInfoShowTime(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataInfoShowtimes();
  }, [param.id]);

  return (
    <div style={{ color: "#e9e9e9", background: `rgb(10, 32, 41)` }}>
      <div className='h-viewH40' style={{ width: "100%", position: "relative" }}>
        <div
          className='absolute top-0 left-0 right-0 bottom-0 '
          style={{
            background: `url(${infoMovie.hinhAnh}) top center/cover no-repeat`,
          }}></div>
        <div
          className='absolute top-0 left-0 right-0 bottom-0'
          style={{
            background: `linear-gradient(to top, rgb(10, 32, 41), transparent 100%)`,
          }}>
          <button
            className='opacity-75 hover:opacity-100'
            style={{
              color: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translateX(-50%)`,
              fontSize: "50px",
            }}
            onClick={onOpenModal}>
            <i className='fa-regular fa-circle-play'></i>
          </button>
          <Modal
            open={open}
            styles={{
              modal: {
                width: "100%",
                height: "80%",
                padding: "0px",
                background: "transparent",
                margin: 0,
                maxWidth: "950px",
              },
              overlay: {
                background: "rgba(0, 0, 0, 0.8)",
              },
            }}
            onClose={onCloseModal}
            closeIcon={<i className='fa-solid fa-x text-white'></i>}
            center>
            <ReactPlayer controls={true} url={infoMovie.trailer} width={"100%"} height={"100%"} />
          </Modal>
        </div>
      </div>
      <div style={{ padding: "0 15px" }}>
        <h3>{moment(infoMovie.ngayKhoiChieu).format("LL")}</h3>
        <div className='flex items-center'>
          <div className='w-8 h-8 leading-8 bg-orange-500 text-white font-bold text-center inline-block mr-4'>
            G
          </div>
          <span className='text-3xl'>{infoMovie.tenPhim}</span>
        </div>
        <p className='my-4'>120 Minutes - 2D/Digital</p>
        <div className='flex items-center space-x-5'>
          <div className='flex items-center '>
            <div className='bg-yellow-400 p-1 mr-2 rounded-md text-black font-bold'>IMDb</div>
            <span className='font-bold'>{infoMovie.danhGia}</span>
          </div>
          <div className='flex items-center  px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer'>
            <i className='fa-brands fa-square-facebook'></i>
            <p className='ml-2'>Chia sẻ</p>
          </div>
          <div className='flex items-center  px-3 py-1 rounded border border-white opacity-80 hover:opacity-100 cursor-pointer'>
            <i className='fa-solid fa-plus'></i>
            <span className='ml-2'>Bộ sưu tập</span>
          </div>
        </div>
      </div>
      <div id='tabMobile'>
        <Tabs
          centered={true}
          defaultActiveKey='1'
          items={[
            {
              key: "1",
              label: (
                <h3 className='text-white hover:scale-125 duration-300 text-2xl font-semibold tracking-wide'>
                  Lịch chiếu
                </h3>
              ),
              children: (
                <div>
                  <Tabs
                    style={{
                      background: "white",
                    }}
                    className='border rounded-md shadow-lg '
                    centered
                    tabPosition='top'
                    defaultActiveKey='1'
                    items={infoShowTime.heThongRapChieu?.map((htr, index) => {
                      return {
                        key: index,
                        label: (
                          <img
                            src={htr.logo}
                            width={60}
                            className='hover:animate-pulse duration-1000'
                            alt={htr.logo}
                          />
                        ),
                        children: (
                          <Collapse
                            items={htr.cumRapChieu?.map((item, index) => {
                              return {
                                key: index,
                                label: (
                                  <div className='flex'>
                                    <img width={60} src={item.hinhAnh} alt={item.hinhAnh} />
                                    <div className='ml-4'>
                                      <h3 className='text-xl font-semibold'>{item.tenCumRap}</h3>
                                      <p className='text-gray-300'>{item.diaChi}</p>
                                    </div>
                                  </div>
                                ),
                                children: (
                                  <div className='grid grid-cols-1 gap-6'>
                                    {item.lichChieuPhim?.map((lichChieu, index) => {
                                      return (
                                        <NavLink
                                          to={
                                            info ? `/ticketroom/${lichChieu.maLichChieu}` : "/login"
                                          }
                                          key={index}>
                                          <div
                                            id='btnDatVe'
                                            style={{
                                              borderColor: "#e4e4e4",
                                              background: `rgba(246,246,246,0.5)`,
                                            }}
                                            className='font-semibold  px-3 py-1 text-center  border duration-300 hover:scale-110 cursor-pointer'>
                                            <span className='text-gray-400 '>
                                              {moment(infoMovie.ngayChieuGioChieu).format("LL")}
                                            </span>
                                            <span> - </span>
                                            <span className='text-green-500 gioChieu '>
                                              {moment(infoMovie.ngayChieuGioChieu).format("LT")}
                                            </span>
                                          </div>
                                        </NavLink>
                                      );
                                    })}
                                  </div>
                                ),
                              };
                            })}
                            defaultActiveKey={["1"]}
                          />
                        ),
                      };
                    })}
                  />
                </div>
              ),
            },
            {
              key: "2",
              label: (
                <h3 className='text-white hover:scale-125 duration-300 text-2xl font-semibold tracking-wide'>
                  Thông tin
                </h3>
              ),
              children: (
                <Fragment>
                  <div className='text-white text-base'>
                    <div className='grid grid-cols-3 gap-1 px-5'>
                      <p className='font-semibold'>Khởi chiếu</p>
                      <p className='col-span-2'>{moment(infoMovie.ngayKhoiChieu).format("LL")}</p>
                    </div>
                    <div className='grid grid-cols-3 gap-1 px-5 my-3'>
                      <p className='font-semibold'>Đạo diễn</p>
                      <p className='col-span-2'>Adam Wingard</p>
                    </div>
                    <div className='grid grid-cols-3 gap-1 px-5 my-3'>
                      <p className='font-semibold'>Diễn viên</p>
                      <p className='col-span-2'>
                        Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown
                      </p>
                    </div>
                    <div className='grid grid-cols-3 gap-1 px-5 my-3'>
                      <p className='font-semibold'>Thể loại</p>
                      <p className='col-span-2'>Cartoon, Sci-fi</p>
                    </div>
                    <div className='grid grid-cols-3 gap-1 px-5 my-3'>
                      <p className='font-semibold'>Format</p>
                      <p className='col-span-2'>2D/Digital</p>
                    </div>
                    <div className='grid grid-cols-3 gap-1 px-5'>
                      <p className='font-semibold'>Ngôn ngữ</p>
                      <p className='col-span-2'>English</p>
                    </div>
                  </div>
                  <div className='text-white p-5 text-base'>
                    <p className='font-semibold mb-3'>Nội dung</p>
                    <p>{infoMovie.moTa}</p>
                  </div>
                </Fragment>
              ),
            },
          ]}
        />
      </div>
      <div className=' footer'>
        <div
          className='footer__top py-20'
          style={{
            background: `url(../image/footer/footer_bg.png) center / cover no-repeat`,
            height: "100%",
          }}>
          <div className='container grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 md:grid-cols-4 md:gap-7 '>
            <div>
              <img src='../image/logo_movie.png' className='mb-4 md:mt-8' alt='...' />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
              </p>
            </div>

            <div>
              <h4>Liên hệ</h4>
              <div className='flex items-center '>
                <i className='fa-solid fa-location-arrow mr-4'></i>
                <p className='md:text-sm xl:text-base'>Lorem ipsum dolor sit.</p>
              </div>
              <div className='flex items-center '>
                <i className='fa-regular fa-envelope mr-4'></i>
                <p>nguyenduylk202@gmail.com</p>
              </div>
              <div className='flex items-center '>
                <i className='fa-solid fa-phone mr-4'></i>
                <p className='text-orange-500 font-semibold'>01-234-5678</p>
              </div>
            </div>
          </div>
        </div>
        <div className='footer__bottom bg-black py-5'>
          <div className=' container  flex justify-between' style={{ color: "#666666" }}>
            <div>©copyright 2016 Movie</div>
            <div className='space-x-4 cursor-pointer'>
              <NavLink to={"https://www.facebook.com/"}>
                <i className='fa-brands fa-facebook-f hover:text-orange-500 duration-300'></i>
              </NavLink>
              <NavLink to={"https://twitter.com/"}>
                <i className='fa-brands fa-x-twitter hover:text-orange-500 duration-300'></i>
              </NavLink>
              <NavLink to={"https://www.linkedin.com/"}>
                <i className='fa-brands fa-linkedin-in hover:text-orange-500 duration-300'></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
