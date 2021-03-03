import { useReducer } from "react";
import { BoardType, TaskType } from "../interfaces/interface";

export type Action = {
  type: "updateTask";
  payload: {
    tasks: TaskType[];
    boardId: number;
  };
};

export const filterTask = () => {
  const initialData: TaskType[] = [
    {
      id: 0,
      name: "",
      explanation: "",
      deadline_date: "",
      board_id: 0,
    },
  ];

  // const reducer = (tasks: TaskType[], action: filterAction) => {
  //   switch (action.type) {
  //     case "filterTask":
  //
  //       if (id === 0) {
  //         return action.payload.tasks;
  //       } else {
  //         return action.payload.tasks.filter((task: TaskType) => {
  //           return id === task.genreId;
  //         });
  //       }
  //   }
  // };
  // const [filteredTasks, tasksDispatch] = useReducer(reducer, initialData);
  // return [filteredTasks, tasksDispatch];
};
