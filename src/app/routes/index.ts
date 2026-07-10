import express from "express";
import userRouter from "../modules/users/user.route";
import AcademicSemesterRouter from "../modules/academicSemester/academicSemester.route";
import AcademicFaultyRouter from "../modules/academicFaculty/academicFaculty.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/academic-semesters",
    route: AcademicSemesterRouter,
  },
  {
    path: "/academic-faculty",
    route: AcademicFaultyRouter,
  },
  {
    path: "/users",
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
