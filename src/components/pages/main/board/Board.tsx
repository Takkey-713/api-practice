import React, { useState, useContext, useRef } from "react";
import { BoardType, TaskType } from "../../../interfaces/interface";
import styles from "./Board.module.css";
import { Task } from "../task/Task";
// import { CancelOutlined } from "@material-ui/icons";
import { BoardRequest } from "../../../requests/BoardRequest";
import { TaskRequest } from "../../../requests/TaskRequest";
import { DataContext } from "../../../../Guard";
import { BoardModal } from "../../../../components/pages/modal/BoardModal";
// import { BoardMenu } from "../../../pages/main/boardMenu/BoardMenu";
// import "./popup.css";

interface Props {
  board: BoardType;
  tasks?: TaskType[];
}

export const Board: React.FC<Props> = (props) => {
  const [boardOpen, setBoardOpen] = useState(true);
  const [taskAddIsOpen, setTaskAddIsOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState(props.board.name);
  const { data, dispatch } = useContext(DataContext);
  const [taskName, setTaskName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [isShown, setIsShown] = useState(false);

  const requestTaskData: TaskType = {
    name: taskName,
    board_id: props.board.id,
  };

  const requestBoardData: BoardType = {
    id: props.board.id,
    name: boardName,
  };

  const onClickSubmit = async () => {
    try {
      const tasks: TaskType[] = await TaskRequest("createTasks", {
        data: requestTaskData,
      });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      setTaskAddIsOpen(!taskAddIsOpen);
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  const handleOnBoardModalClose = () => {
    setIsOpen(!isOpen);
  };

  const handleOnBoardOpen = () => {
    setBoardOpen(!boardOpen);
    setBoardName(props.board.name);
  };

  const onKeySubmit = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      try {
        const boards: BoardType[] = await BoardRequest("updateBoards", {
          data: requestBoardData,
        });
        dispatch({ type: "boardsUpdate", payload: { board: boards } });
        setBoardOpen(!boardOpen);
      } catch (err) {
        alert("通信に失敗しました。");
      }
    } else {
      return;
    }
  };

  // const handleOnBoardMenu = () => {
  //   setIsShown(!isShown);
  // };

  const clickOnTaskAdd = () => {
    setTaskAddIsOpen(!taskAddIsOpen);
  };

  return (
    <div className={styles.contents}>
      {boardOpen ? (
        <div className={styles.board_name}>
          <div
            onClick={() => handleOnBoardOpen()}
            className={styles.board_name_title}
          >
            {props.board.name}
          </div>
          <div className={styles.board_icon} onClick={() => setIsOpen(!isOpen)}>
            :
          </div>

          <BoardModal
            isOpen={isOpen}
            board={props.board}
            handleOnBoardModalClose={handleOnBoardModalClose}
          />
        </div>
      ) : (
        <div className={styles.board_name}>
          <textarea
            className={styles.board_textarea}
            placeholder={props.board.name}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setBoardName(e.target.value);
            }}
            onKeyPress={(e: React.KeyboardEvent) => onKeySubmit(e)}
          />

          {/* ↑リストのタイトルの追加を行いたい(あと回し)→理想はenterキーをおしたり、スコープ外をクリックすると更新がかかる感じにしたい */}

          <div
            className={styles.board_cancel_btn}
            onClick={() => setBoardOpen(!boardOpen)}
          >
            ×
          </div>
        </div>
      )}
      <div className={styles.task_lists}>
        {props.tasks &&
          props.tasks.map((task: TaskType) => {
            return <Task task={task} board={props.board} key={task.id} />;
          })}
      </div>
      {taskAddIsOpen ? (
        <>
          <div className={styles.task_field}>
            <textarea
              placeholder="カードのタイトルを入力してください"
              className={styles.task_textarea}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTaskName(e.target.value)
              }
            />
          </div>
          <div className={styles.add_submit_form}>
            <input
              type="submit"
              className={styles.add_task_submit}
              value="タスクを追加する"
              onClick={() => onClickSubmit()}
            />
            <div
              className={styles.task_cancel_btn}
              onClick={() => setTaskAddIsOpen(!taskAddIsOpen)}
            >
              ×
            </div>
          </div>
        </>
      ) : (
        <div className={styles.add_task} onClick={() => clickOnTaskAdd()}>
          <div> + タスクを追加する</div>
        </div>
      )}
      {/* <div className={`popup-menu ${isShown ? "shown" : ""}`}> */}
      {/* <BoardMenu isShown={isShown} /> */}
      {/* </div> */}
    </div>
  );
};
