import DefaultLayout from "layouts/DefaultLayout";
import { Routes, Route } from "react-router-dom";
import { privateRoutes } from "routes/routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminLayout from "layouts/AdminLayout";
import Home from "modules/Home/page/Home";
import CoursesAll from "modules/Courses/page/CoursesAll";
import Profile from "modules/Profile/page/Profile";
import CoursesLayOut from "modules/Courses/Layout/CoursesLayOut";
import CourseByCatgory from "modules/Courses/page/CourseByCatgory";
import CourseDetail from "modules/CourseDetail/page/CourseDetail";
import CheckUserRoute from "routes/CheckUserRoute";
import Page404 from "modules/Page404";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <CheckUserRoute>
                <Profile />
              </CheckUserRoute>
            }
          />
          <Route path="courses" element={<CoursesLayOut />}>
            <Route index element={<CoursesAll />} />
            <Route path=":category" element={<CourseByCatgory />} />
          </Route>
          <Route path="courses/detail/:courseId" element={<CourseDetail />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {privateRoutes?.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>

      {/* alert */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
