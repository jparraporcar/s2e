import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deepMergeStateReconcilerQuizs } from "../../utils/utils";
import { fetchCourseSectionQuiz } from "./actions";

export interface QuizItem {
  sectionName: string;
  subsection1: Subsection;
  subsection2: Subsection;
}

export type Question = {
  correct: string;
  a: string;
  b: string;
  c: string;
  questionName: string;
};

interface Subsection {
  subsectionName: string;
  questions: Question[];
}

interface QuizState {
  quizItem: QuizItem[];
}

export interface QuizsListState {
  loadingState: "requested" | "received" | "error" | "";
  quizs: { [key: number]: QuizState };
}

const initialState = {
  quizs: {} as { [key: number]: QuizState },
  loadingState: "",
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
    },
    initializeLoadingState: (state) => {
      state.loadingState = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseSectionQuiz.fulfilled, (state, action) => {
      state.loadingState = "requested";
      console.log("push");
      if (!state.quizs[action.payload.goalId]) {
        state.quizs[action.payload.goalId] = {
          quizItem: [action.payload.content],
        };
        return;
      }
      console.log(action.payload.content, "action.payload.content");
      state.quizs[action.payload.goalId].quizItem.push(action.payload.content);
      state.loadingState = "received";
    });
    builder.addCase(fetchCourseSectionQuiz.rejected, (state, action) => {
      state.loadingState = "error";
    });
  },
});

export const { evalAnswer, initializeLoadingState } = evaluationSlice.actions;

export const persistedEvaluationReducerSlice = persistReducer(
  persistConfig,
  evaluationSlice.reducer as any
);