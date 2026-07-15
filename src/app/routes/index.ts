import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import AcademicSemesterRouter from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes as AcademicFaultyRouter } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDeperment/academicDepartment.routes";
import { StudentRoutes } from "../modules/student/student.route";
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
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
