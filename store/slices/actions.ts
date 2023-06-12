import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { GoalsItem } from "./goalsListSlice";
import Config from 'react-native-config'

interface FetchResponse {
  role: string;
  content: string;
}

interface FetchResponseSection {
  goalId: number;
  content: any;
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
  const response = await axios.get<FetchResponse>(
    Config.INDEX_API_URL as string,
    { params: queryCourseIndex }
  );
  return response.data;
});

export const fetchCourseSectionQuiz = createAsyncThunk<
  FetchResponseSection,
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
      subsectionsNumber: 1,
      numberOfQuestionsPerSubsection: 2,
      numberOfPosibleSolutionsPerSubsection: 3,
    };

    const response = await axios.get<FetchResponseSection>(
      Config.SECTION_API_URL as string,
      { params: queryCourseSectionIndex }
    );

    return {
      goalId: Number(goalId),
      content: JSON.parse(response.data.content) as any,
    };
  }
);
