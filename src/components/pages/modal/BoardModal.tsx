import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { BoardType } from "../../interfaces/interface";
import { BoardRequest } from "../../requests/BoardRequest";
import styles from "./boardModal.module.css";
import { DataContext } from "../../../Guard";

const Style = {
  overlay: {
    backgroundColor: "transparent",
  },
  content: {
    top: "10%",
    left: "60%",
    right: "50%",
    height: "75vh",
    width: "20vw",
    marginLeft: "-30vw",
    padding: "2vw 10vw",
  },
};

interface Props {
  isOpen: boolean;
  board: BoardType;
  handleOnBoardModalClose: () => void;
}

Modal.setAppElement("#root");

export const BoardModal: React.FC<Props> = (props) => {
  const { data, dispatch } = useContext(DataContext);

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

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.handleOnBoardModalClose}
        style={Style}
      >
        <div>
          <span
            className={styles.board_delete_btn}
            onClick={() => handleOnDeleteBoard()}
          >
            リストを削除する
          </span>
        </div>
      </Modal>
    </div>
  );
};
