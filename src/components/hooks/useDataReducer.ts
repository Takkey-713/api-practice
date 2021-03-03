import { useReducer } from "react";
import { TaskType, BoardType } from "../interfaces/interface";

export type Data = {
  tasks: TaskType[];
  boards: BoardType[];
};

export type dataAction = {
  type: "tasksUpdate" | "boardsUpdate";
  payload: { task?: TaskType[]; board?: BoardType[] };
};

export const useDataReducer = (): [
  Data,
  ({ type, payload }: dataAction) => void
] => {
  const initialData: Data = {
    tasks: [
      {
        id: 0,
        name: "",
        explanation: "",
        deadline_date: "",
        board_id: 0,
      },
    ],
    boards: [{ id: 0, name: "" }],
  };

  const reducer = (state: Data, action: dataAction) => {
    switch (action.type) {
      case "tasksUpdate":
        return { ...state, tasks: action.payload.task || state.tasks };
      case "boardsUpdate":
        return { ...state, boards: action.payload.board || state.boards };
    }
  };
  const [data, dispatch] = useReducer(reducer, initialData);
  return [data, dispatch];
};
