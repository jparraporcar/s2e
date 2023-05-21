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
// thunk is dispatched only if a course is found in the recently added goal course array
export const fetchCourseIndexOfGoal = createAsyncThunk<
  FetchResponse,
  { courseGoal: GoalsItem["goalData"]["course"][0] },
  { state: RootState }
>("indexData/fetch", async ({ courseGoal }, thunkAPI) => {
  const state = thunkAPI.getState();

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
