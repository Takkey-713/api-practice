import axios from "axios";
import { registAuthData, loginAuthData } from "../interfaces/userAuth";

type action = "sign_in" | "sign_up" | "sign_out" | "check_login";
type parameter = { data: registAuthData | loginAuthData };

const option = axios.create({
  baseURL: "http://localhost:3001",
  responseType: "json",
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const AuthRequest: (action: action, user?: parameter) => any = async (
  action: action,
  parameter?: parameter
) => {
  if (parameter) {
    switch (action) {
      case "sign_in":
        const signInUser = await option.post("/sign_in", {
          user: parameter.data,
        });
        return signInUser.data;
      case "sign_up":
        const signUpUser = await option.post("/sign_up", {
          user: parameter.data,
        });
        return signUpUser.data;
    }
  } else {
    switch (action) {
      case "sign_out":
        const signOutUser = await option.delete("/sign_out");
        return signOutUser.data;
      case "check_login":
        const currentUser = await option.get("/check_login");
        return currentUser.data;
      default:
        return null;
    }
  }
};
