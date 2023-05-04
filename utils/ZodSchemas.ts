import { z } from "zod";
const actualYear = new Date().getFullYear();
export const bookSchema = z
  .object({
    Name: z
      .string({ required_error: "Name is required" })
      .min(10, { message: "Book name min. number of characters is 10" })
      .regex(/^[A-Za-z\s]*$/, {
        message: "Book name cannot include special characters",
      }),
    Author: z
      .string({ required_error: "Author input is required" })
      .min(5, { message: "Author name min. number of characters is 5" }),
    Pages: z
      .number({ required_error: "Pages input is required" })
      .min(10, { message: "Min. number of pages is 10" })
      .max(1500, { message: "Max. number of pages is 1500" }),
    Year: z
      .number({ required_error: "Year input is required" })
      .min(actualYear - 100, { message: "Min. value for year is 1923" })
      .max(actualYear, { message: "Max. value for year is 2023" }),
  })
  .required();
export const courseSchema = z
  .object({
    Name: z
      .string({ required_error: "Name input is required" })
      .min(10, { message: "Course name min. number of characters is 10" })
      .regex(/^[A-Za-z\s]*$/, {
        message: "Course name cannot include special characters",
      }),
    Instructor: z
      .string({ required_error: "Instructor input is required" })
      .min(5, { message: "Instructor name min. number of characters is 10" }),
    Sections: z
      .number({ required_error: "Sections input is required" })
      .min(5, { message: "Min. number of sections is 5" })
      .max(30, { message: "Max. number of sections is 30" }),
    Lectures: z
      .number({ required_error: "Lectures input is required" })
      .min(10, { message: "Min. number of lectures is 10" })
      .max(300, { message: "Max. number of lectures is 300" }),
  })
  .required();
