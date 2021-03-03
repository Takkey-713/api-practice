import React from "react";
import styles from "./Header.module.css";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

interface Props {
  handleOnLogout: () => void;
  isLoggedIn: boolean;
}
export const Header: React.FC<Props> = (props) => {
  return (
    <div className={styles.header}>
      <div>
        <DoneOutlineIcon
          className={styles.header_icon}
          style={{ fontSize: "large" }}
        />
      </div>

      <div className={styles.header__title}>TaskApp</div>
      <div className={styles.header_list}>
        <ul className={styles.ul}>
          <li className={styles.li}>_</li>
          <li className={styles.li}>__</li>
          <li className={styles.li} onClick={() => props.handleOnLogout()}>
            ログアウト
          </li>
        </ul>
      </div>
    </div>
  );
};
