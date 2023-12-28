import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Layout from "./template/Layout";
import InfoMovie from "./page/InfoMovie/InfoMovie";
import Register from "./page/Register/Register";
import BookTicket from "./page/BookTicket/BookTicket";
import Loading from "./components/Loading";
import UserInfo from "./page/UserInfo/UserInfo";
import PageNotFound from "./page/Page_404/PageNotFound";
import "moment/locale/vi";

function App() {
  return (
    <div>
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/detail/:id'
            element={
              <Layout>
                <InfoMovie />
              </Layout>
            }
          />
          <Route
            path='/login'
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path='/register'
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path='/ticketroom/:id'
            element={
              <Layout>
                <BookTicket />
              </Layout>
            }
          />
          <Route
            path='/profile'
            element={
              <Layout>
                <UserInfo />
              </Layout>
            }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
