import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "./pages/header/Header";
import { Main } from "./pages/main/Main";
import "./Home.css";

interface Props {
  isLoggedIn: boolean;
  handleOnLogout: () => void;
}

export const Home: React.FC<Props> = (props) => {
  return (
    <div className="main">
      <Header
        handleOnLogout={props.handleOnLogout}
        isLoggedIn={props.isLoggedIn}
      />
      <Main />
    </div>
  );
};
