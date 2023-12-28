import React, { useEffect, useState } from "react";
import { getInfoMovie, getInfoShowtimes } from "../../Services/api";
import { Progress, Rate } from "antd";
import { Tabs } from "antd";
import moment from "moment/moment";
import { NavLink, useParams } from "react-router-dom";
import "./info.scss";
import Footer from "../../components/Footer";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOff, handleLoadingOn } from "../../redux/reducer/spinnerSlice";
export default function InfoMovieDesktop() {
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
    <div>
      <div style={{ background: `rgb(10, 32, 41)` }}>
        <div className='md:h-viewH40 lg:h-viewH80' style={{ width: "100%", position: "relative" }}>
          <div
            className='absolute top-0 left-0 right-0 bottom-0 '
            style={{
              background: `url(${infoMovie.hinhAnh}) top center/cover no-repeat`,
            }}></div>
          <div
            className='absolute top-0 left-0 right-0 bottom-0'
            style={{
              background: `linear-gradient(to top, #06121E, transparent 100%)`,
            }}></div>
        </div>
        <div style={{ background: "#081418" }} className='pt-80 pb-40'>
          <div className='grid grid-cols-4 gap-10 ' id='infoMovieDesktop'>
            <div>
              <img
                loading='lazy'
                src={infoMovie.hinhAnh}
                style={{ width: "100%" }}
                className='rounded-md hover:animate-pulse duration-500'
                alt={infoMovie.hinhAnh}
              />
              <div>
                <button
                  className='w-full py-3 mt-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 duration-300'
                  onClick={onOpenModal}>
                  Trailer
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
                  <ReactPlayer
                    controls={true}
                    url={infoMovie.trailer}
                    width={"100%"}
                    height={"100%"}
                  />
                </Modal>
              </div>
            </div>
            <div className='col-span-2'>
              <p className='text-4xl font-bold text-white'>{infoMovie.tenPhim}</p>
              <p className='text-orange-500 my-5 font-semibold text-xl'>
                <i className='fa-regular fa-clock mr-3'></i>
                {moment(infoMovie.ngayKhoiChieu).format("LL")}
              </p>
              <div className='flex items-center space-x-5'>
                <div className='flex items-center '>
                  <div className='bg-yellow-400 p-1 mr-2 rounded-md text-black font-bold'>IMDb</div>
                  <span className='font-bold'>{infoMovie.danhGia}</span>
                </div>
                <div className='px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 duration-300 cursor-pointer'>
                  <i className='fa-brands fa-square-facebook'></i>
                  <span className='ml-2'>Chia sẻ</span>
                </div>
                <div className='px-3 py-1 rounded border border-white opacity-80 hover:opacity-100 cursor-pointer'>
                  <i className='fa-solid fa-plus'></i>
                  <span className='ml-2'>Bộ sưu tập</span>
                </div>
              </div>

              <div className='mt-4'>
                <div className='text-white text-base'>
                  <div className='grid grid-cols-3 gap-1 '>
                    <p className='font-semibold'>Khởi chiếu</p>
                    <p className='col-span-2'>{moment(infoMovie.ngayKhoiChieu).format("LL")}</p>
                  </div>
                  <div className='grid grid-cols-3 gap-1  my-3'>
                    <p className='font-semibold'>Đạo diễn</p>
                    <p className='col-span-2'>Adam Wingard</p>
                  </div>
                  <div className='grid grid-cols-3 gap-1  my-3'>
                    <p className='font-semibold'>Diễn viên</p>
                    <p className='col-span-2'>
                      Kyle Chandler, Rebecca Hall, Eiza González, Millie Bobby Brown
                    </p>
                  </div>
                  <div className='grid grid-cols-3 gap-1  my-3'>
                    <p className='font-semibold'>Thể loại</p>
                    <p className='col-span-2'>Cartoon, Sci-fi</p>
                  </div>
                  <div className='grid grid-cols-3 gap-1  my-3'>
                    <p className='font-semibold'>Format</p>
                    <p className='col-span-2'>2D/Digital</p>
                  </div>
                  <div className='grid grid-cols-3 gap-1 '>
                    <p className='font-semibold'>Ngôn ngữ</p>
                    <p className='col-span-2'>English</p>
                  </div>
                </div>

                <div className='text-white mt-3 text-base'>
                  <p className='font-semibold mb-3'>Nội dung</p>
                  <p>{infoMovie.moTa}</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-center justify-start'>
              <Progress
                strokeColor={"orange"}
                type='circle'
                percent={infoMovie.danhGia * 10}
                format={(percent) => <span className='text-orange-500'>{percent}</span>}
              />
              <Rate className='mt-4' allowHalf value={infoMovie.danhGia / 2} />
            </div>
          </div>
          <div className='containerTabs'>
            <Tabs
              id='cumRapChieu'
              className='bg-white rounded-md shadow-lg '
              tabPosition='left'
              defaultActiveKey='1'
              items={infoShowTime.heThongRapChieu?.map((htr, index) => {
                return {
                  key: index,
                  label: (
                    <img
                      src={htr.logo}
                      width={100}
                      className='hover:animate-pulse duration-1000'
                      alt={htr.logo}
                    />
                  ),
                  children: (
                    <div>
                      {htr.cumRapChieu.map((tenRap, index) => {
                        return (
                          <div key={index} className='py-5 pr-5'>
                            <div className='flex items-center pb-3 border-b-2 border-zinc-200'>
                              <img
                                src={tenRap.hinhAnh}
                                width={100}
                                className='py-3'
                                alt={tenRap.hinhAnh}
                              />
                              <div className='m-4'>
                                <h2 className='text-3xl font-semibold mb-4'>{tenRap.tenCumRap}</h2>
                                <p style={{ color: "#9B9B9B" }}>{tenRap.diaChi}</p>
                              </div>
                            </div>

                            <div className='grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-4 mt-5'>
                              {tenRap.lichChieuPhim.slice(0, 10).map((gioChieu, index) => {
                                return (
                                  <NavLink
                                    key={index}
                                    to={info ? `/ticketroom/${gioChieu.maLichChieu}` : "/login"}>
                                    <div
                                      id='btnDatVe'
                                      style={{
                                        borderColor: "#e4e4e4",
                                        background: `rgba(246,246,246,0.5)`,
                                      }}
                                      className='font-semibold  px-3 py-1 text-center  border duration-300 hover:scale-110  cursor-pointer'>
                                      <span className='text-gray-400 '>
                                        {moment(infoMovie.ngayChieuGioChieu).format("LL")}
                                      </span>
                                      <span> - </span>
                                      <span className='text-green-500 duration-300 gioChieu'>
                                        {moment(infoMovie.ngayChieuGioChieu).format("LT")}
                                      </span>
                                    </div>
                                  </NavLink>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ),
                };
              })}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
