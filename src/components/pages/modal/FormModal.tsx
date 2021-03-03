import React, { useState } from "react";
import Modal from "react-modal";
import { TaskBody } from "./TaskBody";
import { TaskType } from "../../interfaces/interface";

const styles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.32)",
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
  handleClose: () => void;
  isOpen: boolean;
  task: TaskType;
}

export const FormModal = (props: Props) => {
  // const handleOpen = () => {
  //   setIsOpen(true);
  // };
  // const handleClose = () => {
  //   setIsOpen(false);
  // };

  Modal.setAppElement("#root");

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.handleClose}
        style={styles}
      >
        <TaskBody task={props.task} handleOnClose={props.handleClose} />
      </Modal>
    </div>
  );
};

export default FormModal;
