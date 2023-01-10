import UsersAdmin from "modules/Admin/page/UsersAdmin";
import CoursesAdmin from "modules/Admin/page/CoursesAdmin";
import AddUser from "modules/Admin/page/AddUser";
import AddCourse from "modules/Admin/page/AddCourse";
import UpdateUser from "modules/Admin/page/UpdateUser";
import UpdateCourse from "modules/Admin/page/UpdateCourse";

export const privateRoutes = [
  { path: "users", component: <UsersAdmin /> },
  { path: "users/add", component: <AddUser /> },
  { path: "users/update/:userId", component: <UpdateUser /> },
  { path: "courses", component: <CoursesAdmin /> },
  { path: "courses/add", component: <AddCourse /> },
  { path: "courses/update/:courseId", component: <UpdateCourse /> },
];
