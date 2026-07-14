import { z } from "zod";
import { bloodGroup, gender } from "../student/student.constant";

export const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          error: "First name is required",
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          error: "Last name is required",
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        error: "Gender is required",
      }),
      dateOfBirth: z.string({
        error: "Date of birth is required",
      }),
      email: z
        .string({
          error: "Email is required",
        })
        .email(),
      contactNo: z.string({
        error: "Contact number is required",
      }),
      emergencyContactNo: z.string({
        error: "Emergency contact number is required",
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string({
        error: "Present address is required",
      }),
      permanentAddress: z.string({
        error: "Permanent address is required",
      }),
      academicSemester: z.string({
        error: "Academic semester is required",
      }),
      academicDepartment: z.string({
        error: "Academic department is required",
      }),
      academicFaculty: z.string({
        error: "Academic faculty is required",
      }),
      guardian: z.object({
        fatherName: z.string({
          error: "Father name is required",
        }),
        fatherOccupation: z.string({
          error: "Father occupation is required",
        }),
        fatherContactNo: z.string({
          error: "Father contact number is required",
        }),
        motherName: z.string({
          error: "Mother name is required",
        }),
        motherOccupation: z.string({
          error: "Mother occupation is required",
        }),
        motherContactNo: z.string({
          error: "Mother contact number is required",
        }),
        address: z.string({
          error: "Guardian address is required",
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          error: "Local guardian name is required",
        }),
        occupation: z.string({
          error: "Local guardian occupation is required",
        }),
        contactNo: z.string({
          error: "Local guardian contact number is required",
        }),
        address: z.string({
          error: "Local guardian address is required",
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          error: "First name is required",
        }),
        lastName: z.string({
          error: "Last name is required",
        }),
        middleName: z.string().optional(),
      }),
      gender: z.string({
        error: "Gender is required",
      }),
      dateOfBirth: z.string({
        error: "Date of birth is required",
      }),
      email: z
        .string({
          error: "Email is required",
        })
        .email(),
      contactNo: z.string({
        error: "Contact number is required",
      }),
      emergencyContactNo: z.string({
        error: "Emergency contact number is required",
      }),
      bloodGroup: z
        .string({
          error: "Blood group is required",
        })
        .optional(),
      presentAddress: z.string({
        error: "Present address is required",
      }),
      permanentAddress: z.string({
        error: "Permanent address is required",
      }),
      academicDepartment: z.string({
        error: "Academic department is required",
      }),

      academicFaculty: z.string({
        error: "Academic faculty is required",
      }),
      designation: z.string({
        error: "Designation is required",
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          error: "First name is required",
        }),
        lastName: z.string({
          error: "Last name is required",
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        error: "Date of birth is required",
      }),

      gender: z.string({
        error: "Gender is required",
      }),

      bloodGroup: z.string({
        error: "Blood group is required",
      }),

      email: z
        .string({
          error: "Email is required",
        })
        .email(),

      contactNo: z.string({
        error: "Contact number is required",
      }),

      emergencyContactNo: z.string({
        error: "Emergency contact number is required",
      }),

      presentAddress: z.string({
        error: "Present address is required",
      }),

      permanentAddress: z.string({
        error: "Permanent address is required",
      }),

      managementDepartment: z.string({
        error: "Management department is required",
      }),

      designation: z.string({
        error: "Designation is required",
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
