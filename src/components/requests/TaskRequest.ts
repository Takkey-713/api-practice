import axios from "axios";
import { TaskType } from "../interfaces/interface";

type action =
  | "fetchTasks"
  | "createTasks"
  | "updateTasks"
  | "deleteTasks"
  | "updateStatus";

type parameter = { data: TaskType };

const option = axios.create({
  baseURL: "http://localhost:3001/tasks",
  responseType: "json",
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const TaskRequest: (
  action: action,
  parameter?: parameter
) => any = async (action: action, parameter?: parameter) => {
  if (parameter) {
    switch (action) {
      case "createTasks":
        const createTasks = await option.post("/", { task: parameter.data });
        return createTasks.data;
      case "updateTasks":
        const updateTasks = await option.patch(
          `/${parameter.data.id}`,
          parameter.data
        );
        return updateTasks.data;
      case "deleteTasks":
        const deleteTasks = await option.delete(`/${parameter.data.id}`);
        return deleteTasks.data;

      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchTasks":
        const fetchTasks = await option.get("/");
        return fetchTasks.data;
      default:
        return null;
    }
  }
};
