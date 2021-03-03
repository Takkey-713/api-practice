import React, { useState, useContext } from "react";
import { DataContext } from "../../../../App";
import styles from "./AddList.module.css";
import { BoardRequest } from "../../../requests/BoardRequest";
import { BoardType } from "../../../interfaces/interface";

export const AddList = () => {
  const [boardDisplay, setBoardDisplay] = useState(true);
  const [name, setName] = useState("");
  const { data, dispatch } = useContext(DataContext);

  const newData: BoardType = {
    id: 0,
    name: name,
  };

  const onClickSubmit = async () => {
    try {
      const boards: BoardType[] = await BoardRequest("createBoards", {
        data: newData,
      });
      dispatch({ type: "boardsUpdate", payload: { board: boards } });
      setBoardDisplay(!boardDisplay);
    } catch (err) {
      alert("通信に失敗しました。");
    }
  };

  return (
    <>
      {boardDisplay ? (
        <div
          className={styles.add_board}
          onClick={() => setBoardDisplay(!boardDisplay)}
        >
          <div>
            <span>+</span> <span>リストを追加する</span>
          </div>
        </div>
      ) : (
        <div className={styles.add_board_form}>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setName(e.target.value);
            }}
            className={styles.board_textarea}
            placeholder="リストのタイトルを入力..."
          />
          <div className={styles.add_submit_form}>
            <input
              type="submit"
              className={styles.add_list_submit}
              value="リストを追加"
              onClick={onClickSubmit}
            />
            <div
              className={styles.cancel_icon}
              onClick={() => setBoardDisplay(!boardDisplay)}
            >
              ×
            </div>
          </div>
        </div>
      )}
    </>
  );
};
