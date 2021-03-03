import React, { useState, useContext } from "react";
import { DataContext } from "../../../App";
import { Board } from "./board/Board";
import { BoardType, TaskType } from "../../interfaces/interface";
import styles from "./Main.module.css";
import { AddList } from "../main/addList/AddList";

interface BoardsType {
  boards: BoardType[];
}

interface TasksType {
  tasks: TaskType[];
}

export const Main = () => {
  const { data, dispatch } = useContext(DataContext);
  return (
    <div className={styles.main}>
      {data.boards &&
        data.boards.map((ele) => {
          const tasks = data.tasks.filter((task) => {
            return task.board_id === ele.id;
          });
          return (
            <div key={ele.id} className={styles.board_list}>
              <Board tasks={tasks} board={ele} key={ele.id} />
            </div>
          );
        })}
      <div className={styles.board_list}>
        <AddList />
      </div>
    </div>
  );
};
