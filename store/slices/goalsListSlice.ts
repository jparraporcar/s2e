import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoalState } from "./goalSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deepMergeStateReconcilerGoals } from "../../utils/utils";
import { fetchCourseIndexOfGoal } from "./actions";

export type SesionTiming = {
  sesionDayString: string | undefined;
  elapsedTimeSec: number;
  startTimeSec: number;
};

export type GoalsItem = {
  goalId: number;
  goalData: IGoalState;
  percentatges: {
    today: number;
    week: number;
    month: number;
    total: number;
  };
  currentResource: "Book" | "Course";
  totalTime: number;
  sesions: SesionTiming[];
  indexCourse: { loading: boolean; value: string };
  indexBook: { loading: boolean; value: string };
};

export interface GoalsListState {
  goals: GoalsItem[];
}

const initialState = {
  goals: [] as GoalsItem[],
};

const persistConfig = {
  key: "goals",
  storage: AsyncStorage,
  whitelist: ["goals"],
  stateReconciler: (
    inboundState: GoalsListState,
    originalState: GoalsListState
  ) => {
    console.log("State reconciliation goals", { inboundState, originalState });
    return deepMergeStateReconcilerGoals(inboundState, originalState);
  },
};

export const goalsListSlice = createSlice({
  name: "goalsList",
  initialState,
  reducers: {
    setAddGoal: (state, action: PayloadAction<GoalsItem>) => {
      console.log(action.payload, "action.payload");
      state.goals.push(action.payload);
    },
    setDeleteGoal: (state, action: PayloadAction<number>) => {
      state.goals = state.goals.filter(
        (goal) => goal.goalId !== action.payload
      );
    },
    // updateGoalProgress: (
    //   state,
    //   action: PayloadAction<{
    //     id: number;
    //     sesionTiming: SesionTiming;
    //   }>
    // ) => {
    //   const todayString = createTodayString();
    //   const foundGoal = state.goals.find(
    //     (goal) => goal.id === action.payload.id
    //   ) as GoalsItem;
    //   const foundGoalIndex = state.goals.findIndex(
    //     (goal) => goal.id === action.payload.id
    //   );
    //   const foundSesion = foundGoal.sesions.find(
    //     (sesion) => sesion.currentDate === todayString
    //   )

    //   const foundSesionIndex = foundGoal.sesions.findIndex(
    //     (sesion) => sesion.currentDate === todayString
    //   );

    //   const newState = state.goals.filter(
    //     (goal) => goal.id !== action.payload.id
    //   );
    //   // foundGoal.percentatges = action.payload.percentatges;
    //   foundGoal.totalTime += action.payload.sesionTime;
    //   newState.splice(foundGoalIndex, 0, foundGoal);
    //   state.goals = newState;
    // },
    initializeSesion: (
      state,
      action: PayloadAction<{
        goalIndex: number;
        sesionTiming: SesionTiming;
      }>
    ) => {
      state.goals[action.payload.goalIndex].sesions.push(
        action.payload.sesionTiming
      );
    },
    updateSesion: (
      state,
      action: PayloadAction<{
        sesionIndex: number;
        goalIndex: number;
        sesionTiming: SesionTiming;
      }>
    ) => {
      state.goals[action.payload.goalIndex].sesions[
        action.payload.sesionIndex
      ].elapsedTimeSec = action.payload.sesionTiming.elapsedTimeSec;
    },
    setCurrentResource: (
      state,
      action: PayloadAction<{ currentResource: "Book" | "Course"; id: number }>
    ) => {
      const foundGoal = state.goals.find(
        (goal) => goal.goalId === action.payload.id
      ) as GoalsItem;
      const foundGoalIndex = state.goals.findIndex(
        (goal) => goal.goalId === action.payload.id
      );
      const newState = state.goals.filter(
        (goal) => goal.goalId !== action.payload.id
      );
      foundGoal.currentResource = action.payload.currentResource;
      newState.splice(foundGoalIndex, 0, foundGoal);
      state.goals = newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseIndexOfGoal.fulfilled, (state, action) => {
      state.goals[state.goals.length - 1].indexCourse.loading = true;
      state.goals[state.goals.length - 1].indexCourse.value =
        action.payload.content;
      state.goals[state.goals.length - 1].indexCourse.loading = false;
    });
    builder.addCase(fetchCourseIndexOfGoal.rejected, (state, action) => {
      state.goals[state.goals.length - 1].indexCourse.loading = true;
      state.goals[state.goals.length - 1].indexCourse.value = "error";
      state.goals[state.goals.length - 1].indexCourse.loading = false;
    });
  },
});

export const {
  setAddGoal,
  // updateGoalProgress,
  setDeleteGoal,
  setCurrentResource,
  initializeSesion,
  updateSesion,
} = goalsListSlice.actions;

export const persistedGoalsListReducerSlice = persistReducer(
  persistConfig,
  goalsListSlice.reducer
);
