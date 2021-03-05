import React, { useState, useEffect } from "react";
import styles from "./Search.module.css";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { SearchRequest } from "../../requests/SearchRequest";
import { TaskType } from "../../interfaces/interface";

export const SearchForm = () => {
  const [searchText, setSearchText] = useState("");
  const [isShown, setIsShown] = useState(false);

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // searchTasks();
  };

  // const searchTasks = async () => {
  //   const requetData = {
  //     data: searchText,
  //   };
  //   try {
  //     const tasks = await SearchRequest(requetData);
  //   } catch (err) {
  //     alert("通信に失敗しました。");
  //   }
  // };

  return (
    <>
      <form className={styles.search_form}>
        <TextField
          className={styles.search_field}
          margin="none"
          required
          fullWidth
          id="searchInput"
          onClick={(e) => setIsShown(!isShown)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnSearch(e)
          }
        />
        <SearchIcon style={{ marginTop: "7px", cursor: "pointer" }} />
      </form>
    </>
  );
};
