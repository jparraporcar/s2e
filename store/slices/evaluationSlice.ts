import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deepMergeStateReconcilerQuizs } from "../../utils/utils";
import { fetchCourseSectionQuiz } from "./actions";

export type Questions = {
  correct_answer: string;
  options: { [key: string]: string[] };
  question: string;
}[];

export type Subsection = {
  [key: string]: Questions;
};

export type QuizItem = {
  [key: string]: { [key: string]: Subsection } | number;
};

export interface QuizsListState {
  quizs: QuizItem[];
  loadingState: "requested" | "received" | "error" | "";
  result: number;
}

const initialState = {
  quizs: [] as QuizItem[],
  loadingState: "",
  result: 0,
};

const persistConfig = {
  key: "quizs",
  storage: AsyncStorage,
  whitelist: ["quizs"],
  stateReconciler: (
    inboundState: QuizsListState,
    originalState: QuizsListState
  ) => {
    console.log("State reconciliation goals", { inboundState, originalState });
    return deepMergeStateReconcilerQuizs(inboundState, originalState);
  },
};

export const evaluationSlice = createSlice({
  name: "quizs",
  initialState,
  reducers: {
    evalAnswer: (
      state,
      action: PayloadAction<{
        section: string;
        question: string;
        answer: string;
      }>
    ) => {
      //TODO: logic pending
      state.result += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseSectionQuiz.fulfilled, (state, action) => {
      state.loadingState = "requested";
      console.log("push");
      state.quizs.push(action.payload as any); //TODO: pending check typing
      state.loadingState = "received";
    });
    builder.addCase(fetchCourseSectionQuiz.rejected, (state, action) => {
      state.loadingState = "error";
    });
  },
});

export const { evalAnswer } = evaluationSlice.actions;

export const persistedEvaluationReducerSlice = persistReducer(
  persistConfig,
  evaluationSlice.reducer as any
);
