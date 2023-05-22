import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { TCourse } from "./goalSlice";
import { GoalsItem } from "./goalsListSlice";

interface FetchResponse {
  role: string;
  content: string;
}

type QueryCourseIndex = {
  modelType: string;
  numberSections: number;
  difficulty: string;
  courseName: string;
};

type QueryCourseSectionIndex = {
  courseIndex: string;
  modelType: string;
  sectionName: string;
  subsectionsNumber: number;
  numberOfQuestionsPerSubsection: number;
  numberOfPosibleSolutionsPerSubsection: number;
};
// thunk is dispatched only if a course is found in the recently added goal course array
export const fetchCourseIndexOfGoal = createAsyncThunk<
  FetchResponse,
  { courseGoal: GoalsItem["goalData"]["course"][0] },
  { state: RootState }
>("indexData/fetch", async ({ courseGoal }, thunkAPI) => {
  const queryCourseIndex: QueryCourseIndex = {
    modelType: "gpt-3.5-turbo",
    numberSections: courseGoal.sections,
    difficulty: "hard",
    courseName: courseGoal.name,
  };
  console.log(queryCourseIndex);
  const response = await axios.get<FetchResponse>(
    `https://8q88pv8kp9.execute-api.ap-northeast-1.amazonaws.com/dev/indexCourse`,
    { params: queryCourseIndex }
  );
  console.log(response);
  return response.data;
});

export const fetchCourseSectionQuiz = createAsyncThunk<
  FetchResponse,
  { sectionName: string; courseIndexString: string },
  { state: RootState }
>(
  "courseSectionQuiz/fetch",
  async ({ sectionName, courseIndexString }, thunkAPI) => {
    const state = thunkAPI.getState();

    const queryCourseSectionIndex: QueryCourseSectionIndex = {
      courseIndex: courseIndexString,
      modelType: "gpt-3.5-turbo",
      sectionName: sectionName,
      subsectionsNumber: 5,
      numberOfQuestionsPerSubsection: 2,
      numberOfPosibleSolutionsPerSubsection: 4,
    };

    const response = await axios.get<FetchResponse>(
      `http://localhost:4000/dev/courseSectionQuiz`,
      { params: queryCourseSectionIndex }
    );
    console.log(response);
    return response.data;
  }
);
