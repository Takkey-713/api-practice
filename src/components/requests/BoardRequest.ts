import axios from "axios";
import { BoardType } from "../interfaces/interface";
type action = "fetchBoards" | "createBoards" | "updateBoards" | "deleteBoards";
type parameter = { data: BoardType };

const option = axios.create({
  baseURL: "http://localhost:3001/boards",
  responseType: "json",
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const BoardRequest: (action: action, data?: parameter) => any = async (
  action: action,
  parameter?: parameter
) => {
  if (parameter) {
    switch (action) {
      case "createBoards":
        const createBoards = await option.post("/", parameter.data);
        return createBoards.data;
      case "updateBoards":
        const updateBoards = await option.patch(
          `/${parameter.data.id}`,
          parameter.data
        );
        return updateBoards.data;
      case "deleteBoards":
        const deleteTasks = await option.delete(`/${parameter.data.id}`);
        return deleteTasks.data;
      default:
        return null;
    }
  } else {
    switch (action) {
      case "fetchBoards":
        const fetchBoards = await option.get("/");
        return fetchBoards.data;
      default:
        return null;
    }
  }
};
