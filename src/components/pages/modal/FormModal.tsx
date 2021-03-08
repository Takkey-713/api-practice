import React from "react";
import Modal from "react-modal";
import { TaskBody } from "./TaskBody";
import { BoardType, TaskType } from "../../interfaces/interface";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const forPcStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
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

const forMobileStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,.64)",
  },
  content: {
    top: "5vh",
    left: "5vw",
    right: "5vw",
    height: "85vh",
    width: "80vw",
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
  const mq = useMediaQuery();

  return (
    <div>
      {mq.isPc && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleClose}
          style={forPcStyles}
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
      )}

      {mq.isMobile && (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.handleClose}
          style={forMobileStyles}
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
      )}
    </div>
  );
};

export default FormModal;
