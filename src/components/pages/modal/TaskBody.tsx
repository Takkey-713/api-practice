import React, { useState, useContext, useEffect } from "react";
import styles from "./style/TaskModal.module.css";
import { TaskRequest } from "../../requests/TaskRequest";
import { TaskType, BoardType } from "../../interfaces/interface";
import { DataContext } from "../../../App";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  task?: TaskType;
  handleOnClose: () => void;
  board: BoardType;
}

export const TaskBody: React.FC<Props> = (props) => {
  const { data, dispatch } = useContext(DataContext);
  const [title, setTitle] = useState<string>(
    (props.task && props.task.name) || ""
  );
  const [boardId, setBoardId] = useState<number>(
    (props.task && props.task.board_id) || 0
  );
  const [explanation, setExplanation] = useState<string>(
    (props.task && props.task.explanation) || ""
  );
  const [deadlineDate, setDeadlineDate] = useState<string>(
    (props.task && props.task.deadline_date) || ""
  );
  useEffect(() => {
    console.log(boardId);
  }, [boardId]);
  const onClickSubmit = async () => {
    const requestData = props.task
      ? {
          id: props.task && props.task.id,
          name: title,
          board_id: boardId,
          explanation: explanation,
          deadline_date: deadlineDate,
        }
      : {
          name: title,
          board_id: props.board.id,
          explanation: explanation,
          deadline_date: deadlineDate,
        };

    try {
      const tasks: TaskType[] = await TaskRequest(
        props.task ? "updateTasks" : "createTasks",
        {
          data: requestData,
        }
      );
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
    } catch (err) {
      alert("通信に失敗しました。");
    }
    props.handleOnClose();
  };

  const handleOnDelete = async () => {
    const requestData = {
      id: props.task && props.task.id,
      name: title,
      board_id: boardId,
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

  return (
    <form className={styles.modal_body}>
      <CloseIcon
        style={{ cursor: "pointer" }}
        className={styles.task_close_icon}
        onClick={() => props.handleOnClose()}
      />
      <div>
        <h4 className={styles.input_title}>タイトル</h4>
        <textarea
          className={styles.textArea}
          value={title}
          placeholder="タスクのタイトルを入力してください"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setTitle(e.target.value)
          }
        />
        <h4 className={styles.input_title}>説明</h4>
        <textarea
          className={styles.textArea}
          placeholder="説明を記入してください"
          value={explanation}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setExplanation(e.target.value)
          }
        />
        <h4 className={styles.input_title}>期限</h4>

        <input
          className={styles.input_date}
          type="date"
          value={deadlineDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDeadlineDate(e.target.value)
          }
        />
        <div className={styles.deadline_date_msg}>
          {props.task &&
          props.task.deadline_date &&
          new Date(props.task.deadline_date) < new Date()
            ? "※期限が過ぎています"
            : ""}
        </div>
        <h4 className={styles.input_title}>リスト</h4>
        <select
          className={styles.select}
          value={props.task ? boardId : props.board.id}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setBoardId(Number(e.target.value))
          }
        >
          {data.boards &&
            data.boards.map((board: BoardType) => {
              return props.task ? (
                <option key={board.id} value={board.id}>
                  {board.name}
                </option>
              ) : (
                <option key={board.id} value={board.id}>
                  {board.name}
                </option>
              );
            })}
        </select>
      </div>

      <input
        className={styles.input_submit}
        type="button"
        value={props.task ? "タスクを更新する" : "タスクを追加する"}
        onClick={() => onClickSubmit()}
      />

      {props.task && (
        <button
          className={styles.delete_button}
          type="button"
          onClick={handleOnDelete}
        >
          タスクを削除する
        </button>
      )}
    </form>
  );
};
