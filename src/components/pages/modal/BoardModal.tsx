import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { BoardType, TaskType } from "../../interfaces/interface";
import { BoardRequest } from "../../requests/BoardRequest";
import { TaskRequest } from "../../requests/TaskRequest";
import { DataContext } from "../../../App";
import { FormModal } from "./FormModal";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./style/BoardModal.module.css";

const Style = {
  overlay: {
    backgroundColor: "transparent",
  },
  content: {
    top: "10%",
    left: "30%",
    right: "50%",
    height: "75vh",
    width: "20vw",
    padding: "2vw 10vw",
  },
};

interface Props {
  isOpen: boolean;
  board: BoardType;
  handleOnBoardModalClose: () => void;
  tasks?: TaskType[];
}

Modal.setAppElement("#root");

export const BoardModal: React.FC<Props> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  // 既存のタスクをモーダルで表示するためのstate
  const [isShown, setIsShown] = useState(false);
  // 新規タスクを追加するためのモーダルを表示するためのstate

  const handleOnDeleteBoard = async () => {
    const requestData = {
      id: props.board && props.board.id,
      name: props.board && props.board.name,
    };
    try {
      const boards: BoardType[] = await BoardRequest("deleteBoards", {
        data: requestData,
      });
      dispatch({ type: "boardsUpdate", payload: { board: boards } });
      props.handleOnBoardModalClose();
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  const handleOnDelete = async (task: TaskType) => {
    const requestData = {
      id: task.id,
      name: task.name,
      board_id: task.board_id,
    };
    try {
      const tasks: TaskType[] = await TaskRequest("deleteTasks", {
        data: requestData,
      });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  const handleOnTaskModal = () => {
    setIsTaskOpen(!isTaskOpen);
  };

  const handleAddTaksModal = () => {
    setIsShown(!isShown);
  };

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.handleOnBoardModalClose}
        style={Style}
      >
        <div className={styles.modal_body}>
          <div className={styles.board_title}>{props.board.name}</div>
          <div className={styles.task_lists}>
            {props.tasks &&
              props.tasks.map((task) => {
                return (
                  <div className={styles.task_field} key={task.id}>
                    <div
                      className={styles.task_name}
                      onClick={() => handleOnTaskModal()}
                    >
                      {task.name}
                    </div>
                    <DeleteIcon
                      onClick={() => handleOnDelete(task)}
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    />
                    <FormModal
                      isOpen={isTaskOpen}
                      handleClose={handleOnTaskModal}
                      task={task}
                      board={props.board}
                      key={task.id}
                    />
                  </div>
                );
              })}
          </div>
          <div className={styles.add_option}>
            <button
              className={styles.add_task}
              onClick={() => setIsShown(!isShown)}
            >
              タスクを追加する
            </button>
            <FormModal
              isOpen={isShown}
              handleClose={handleAddTaksModal}
              board={props.board}
            />
            <button
              className={styles.board_delete_btn}
              type="button"
              onClick={handleOnDeleteBoard}
            >
              このリストを削除する
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
