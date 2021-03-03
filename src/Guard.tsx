import React, { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { AuthForm } from "./components/auth/AuthForm";
import { AuthRequest } from "./components/requests/AuthRequest";
import { BoardRequest } from "./components/requests/BoardRequest";
import { TaskRequest } from "./components/requests/TaskRequest";
import { UserType } from "./components/interfaces/interface";
import {
  Data,
  dataAction,
  useDataReducer,
} from "./components/hooks/useDataReducer";

type dataContextType = {
  data: Data;
  dispatch: ({ type, payload }: dataAction) => void;
};

export const DataContext = React.createContext<dataContextType>(
  {} as dataContextType
);

export const Guard: React.FC = () => {
  // ここにtask,board,userのstateを管理する
  const [data, dispatch] = useDataReducer();
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: 0,
    email: "",
  });
  // eslint-disable-next-line
  // userのstateは本アプリで必要になる
  const handleOnChangeStatus = (user: UserType): void => {
    setIsLoggedIn(!isLoggedIn);
    setUser(user);
  };

  const handleOnLogout = async () => {
    try {
      const res = await AuthRequest("sign_out");
      if (!res.logged_in) {
        setIsLoggedIn(!isLoggedIn);
        setUser({ id: 0, email: "" });
      }
    } catch {
      alert("通信に失敗しました。");
    }
  };

  const checkLoginStatus = async () => {
    try {
      const res = await AuthRequest("check_login");
      if (res.logged_in && isLoggedIn === false) {
        setIsLoggedIn(true);
        setUser(res.user);
      } else if (res.status === 401) {
        setIsLoggedIn(false);
      }
    } catch {
      alert("通信に失敗しました");
    }
  };

  // 初回マウンティングした時にデータベースのボードとタスクを全て持ってくる
  const fetchData = async () => {
    const boards = await BoardRequest("fetchBoards");
    const tasks = await TaskRequest("fetchTasks");
    dispatch({ type: "boardsUpdate", payload: { board: boards } });
    dispatch({ type: "tasksUpdate", payload: { task: tasks } });
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, [user]);

  useEffect(() => {
    dispatch({
      type: "tasksUpdate",
      payload: { task: data.tasks },
    });
    // eslint-disable-next-line
  }, [data.tasks]);

  return (
    <DataContext.Provider value={{ data, dispatch }}>
      <>
        {isLoggedIn ? (
          <Home isLoggedIn={isLoggedIn} handleOnLogout={handleOnLogout} />
        ) : (
          <AuthForm
            isLoggedIn={isLoggedIn}
            handleOnChangeStatus={handleOnChangeStatus}
          />
        )}
      </>
    </DataContext.Provider>
  );
};
