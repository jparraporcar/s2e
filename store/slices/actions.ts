import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { TCourse } from "./goalSlice";
import { GoalsItem } from "./goalsListSlice";
import { Subsection } from "./evaluationSlice";

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
  { goalId: number; sectionName: string; courseIndexString: string },
  { state: RootState }
>(
  "courseSectionQuiz/fetch",
  async ({ goalId, sectionName, courseIndexString }, thunkAPI) => {
    const state = thunkAPI.getState();

    const queryCourseSectionIndex: QueryCourseSectionIndex = {
      courseIndex: courseIndexString,
      modelType: "gpt-3.5-turbo",
      sectionName: sectionName,
      subsectionsNumber: 2,
      numberOfQuestionsPerSubsection: 2,
      numberOfPosibleSolutionsPerSubsection: 3,
    };

    const response = await axios.get<FetchResponse>(
      `https://8q88pv8kp9.execute-api.ap-northeast-1.amazonaws.com/dev/courseSectionQuiz`,
      { params: queryCourseSectionIndex }
    );
    console.log("action");
    console.log({ [`${goalId}`]: response.data.content as any });
    return { [Number(`${goalId}`)]: JSON.parse(response.data.content) } as any; //TODO: pending check typing
  }
);
