import styles from "./BoardMenu.module.css";
import React, { useState, useRef } from "react";

interface Props {
  isShown: boolean;
}

export const BoardMenu: React.FC<Props> = (props) => {
  return <div className={styles.contents}>test</div>;
};
