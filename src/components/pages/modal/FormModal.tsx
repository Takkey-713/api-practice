import React, { useState } from "react";
import Modal from "react-modal";
import { TaskBody } from "./TaskBody";
import { BoardType, TaskType } from "../../interfaces/interface";

const styles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.32)",
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
  handleClose: () => void;
  isOpen: boolean;
  task?: TaskType;
  board: BoardType;
}

export const FormModal = (props: Props) => {
  Modal.setAppElement("#root");

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.handleClose}
        style={styles}
      >
        {props.task ? (
          <TaskBody
            task={props.task}
            handleOnClose={props.handleClose}
            board={props.board}
          />
        ) : (
          <TaskBody handleOnClose={props.handleClose} board={props.board} />
        )}
      </Modal>
    </div>
  );
};

export default FormModal;
