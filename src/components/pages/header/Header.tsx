import React from "react";
import styles from "./Header.module.css";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { SearchForm } from "../search/SearchForm";

interface Props {
  handleOnLogout: () => void;
  isLoggedIn: boolean;
}
export const Header: React.FC<Props> = (props) => {
  return (
    <div className={styles.header}>
      <div className={styles.header_search_area}>
        <SearchForm />
      </div>

      <div className={styles.header_title_list}>
        <div className={styles.header_title}>Task App</div>
      </div>

      <div className={styles.header_list}>
        <ul className={styles.ul}>
          <li className={styles.li} onClick={() => props.handleOnLogout()}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};
