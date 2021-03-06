import React, { useState, useContext, useRef } from "react";
import { BoardType, TaskType } from "../../../interfaces/interface";
import styles from "./Board.module.css";
import { Task } from "../task/Task";
import { BoardRequest } from "../../../requests/BoardRequest";
import { TaskRequest } from "../../../requests/TaskRequest";
import { DataContext } from "../../../../App";
import { BoardModal } from "../../../../components/pages/modal/BoardModal";

interface Props {
  board: BoardType;
  tasks?: TaskType[];
}

export const Board: React.FC<Props> = (props) => {
  const [boardOpen, setBoardOpen] = useState(true);
  const [taskAddIsOpen, setTaskAddIsOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState(props.board.name);
  const [taskName, setTaskName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, dispatch } = useContext(DataContext);
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottomOfList = React.useCallback(() => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const onClickSubmit = async () => {
    const requestTaskData: TaskType = {
      name: taskName,
      board_id: props.board.id,
    };

    try {
      const tasks: TaskType[] = await TaskRequest("createTasks", {
        data: requestTaskData,
      });
      dispatch({ type: "tasksUpdate", payload: { task: tasks } });
      setTaskAddIsOpen(!taskAddIsOpen);
    } catch (err) {
      alert("通信に失敗しました。");
    }
    scrollToBottomOfList();
  };

  const onKeySubmit = async (e: React.KeyboardEvent) => {
    const requestBoardData: BoardType = {
      id: props.board.id,
      name: boardName,
    };

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
      return false;
    }
  };

  const handleOnBoardModalClose = () => {
    setIsOpen(!isOpen);
  };

  const handleOnBoardOpen = () => {
    setBoardOpen(!boardOpen);
    setBoardName(props.board.name);
  };

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
            tasks={props.tasks}
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
            return (
              <>
                <Task task={task} board={props.board} />
                <div className="scroll_ref" ref={ref}></div>
              </>
            );
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
    </div>
  );
};
