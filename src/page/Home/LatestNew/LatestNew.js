import React from "react";

export default function LatestNew() {
  return (
    <div id='news'>
      <div
        style={{
          background: `url(../image/news/bg_latestnew.png) `,
        }}>
        <div style={{ minHeight: "250px" }} className='text-center'>
          <div className='container'>
            <h1 className='font-semibold py-20 inline-block text-3xl text-orange-500'>
              Latest News
            </h1>
          </div>
        </div>
      </div>
      <div className='relative top-[-80px]'>
        <div className=' container'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:gap-8'>
            <div>
              <img src='./image/news/new_1.jpg' loading='lazy' alt='...' />
              <div className='flex flex-col items-center'>
                <h3 className='font-bold text-center text-xl mb-4'>
                  Sáu cuốn sách được chuyển thể thành phim đáng mong đợi vào mùa thu này
                </h3>
                <button className='px-3 py-1 rounded-2xl bg-orange-400 hover:bg-orange-600 text-white text-sm duration-300'>
                  Xem thêm
                </button>
              </div>
            </div>
            <div className='lg:row-span-2 lg:col-span-2'>
              <img loading='lazy' src='./image/news/new_2.jpg' width={750} height={500} alt='...' />
              <div className='flex flex-col items-center'>
                <h3 className='font-bold text-center text-xl '>
                  Giành được kỳ nghỉ ở Thế giới phù thủy với Fantastic
                </h3>
                <p className='text-sm my-4'>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque
                </p>
                <button className='px-3 py-1 rounded-2xl bg-orange-400 hover:bg-orange-600 text-white text-sm duration-300'>
                  Xem thêm
                </button>
              </div>
            </div>
            <div>
              <img loading='lazy' src='./image/news/new_3.jpg' alt='...' />
              <div className='flex flex-col items-center'>
                <h3 className='font-bold text-center text-xl mb-4'>
                  Doctor Strange hội ngộ với Avengers
                </h3>
                <button className='px-3 py-1 rounded-2xl bg-orange-400 hover:bg-orange-600 text-white text-sm duration-300'>
                  Xem thêm
                </button>
              </div>
            </div>
            <div>
              <img loading='lazy' src='./image/news/new_2.jpg' alt='...' />
              <div className='flex flex-col items-center'>
                <h3 className='font-bold text-center text-xl mb-4'>
                  The Beatles: Eight Days a Week – The Touring
                </h3>
                <button className='px-3 py-1 rounded-2xl bg-orange-400 hover:bg-orange-600 text-white text-sm duration-300'>
                  Xem thêm
                </button>
              </div>
            </div>
            <div>
              <img loading='lazy' src='./image/news/new_4.jpg' alt='...' />
              <div className='flex flex-col items-center'>
                <h3 className='font-bold text-center text-xl mb-4'>5 bộ phim đáng xem tuần này</h3>
                <button className='px-3 py-1 rounded-2xl bg-orange-400 hover:bg-orange-600 text-white text-sm duration-300'>
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
