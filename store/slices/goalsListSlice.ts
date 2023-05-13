import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGoalState } from "./goalSlice";
import { PersistConfig, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../store";
import { GoalListItem } from "../../components/GoalListItem";
import { deepMergeStateReconciler } from "../../utils/utils";

export type GoalsItem = {
  id: number;
  goalData: IGoalState;
  percentatges: {
    today: number;
    week: number;
    month: number;
  };
  currentResource: "Book" | "Course";
  totalTime: number;
  sesionTime: number;
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
    console.log("State reconciliation", { inboundState, originalState });
    return deepMergeStateReconciler(inboundState, originalState);
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
      state.goals = state.goals.filter((goal) => goal.id !== action.payload);
    },
    updateGoalProgress: (
      state,
      action: PayloadAction<{
        id: number;
        sesionTime: number;
      }>
    ) => {
      const foundGoal = state.goals.find(
        (goal) => goal.id === action.payload.id
      ) as GoalsItem;
      const foundGoalIndex = state.goals.findIndex(
        (goal) => goal.id === action.payload.id
      );
      const newState = state.goals.filter(
        (goal) => goal.id !== action.payload.id
      );
      // foundGoal.percentatges = action.payload.percentatges;
      foundGoal.totalTime += action.payload.sesionTime;
      foundGoal.sesionTime = action.payload.sesionTime;
      newState.splice(foundGoalIndex, 0, foundGoal);
      state.goals = newState;
    },
    setCurrentResource: (
      state,
      action: PayloadAction<{ currentResource: "Book" | "Course"; id: number }>
    ) => {
      const foundGoal = state.goals.find(
        (goal) => goal.id === action.payload.id
      ) as GoalsItem;
      const foundGoalIndex = state.goals.findIndex(
        (goal) => goal.id === action.payload.id
      );
      const newState = state.goals.filter(
        (goal) => goal.id !== action.payload.id
      );
      foundGoal.currentResource = action.payload.currentResource;
      newState.splice(foundGoalIndex, 0, foundGoal);
      state.goals = newState;
    },
  },
});

export const {
  setAddGoal,
  updateGoalProgress,
  setDeleteGoal,
  setCurrentResource,
} = goalsListSlice.actions;

export const persistedGoalsListReducerSlice = persistReducer(
  persistConfig,
  goalsListSlice.reducer
);
