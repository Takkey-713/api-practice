import React from "react";
import axios from "axios";
import { TaskType } from "../interfaces/interface";

type parameter = { keyword: string };

const option = axios.create({
  baseURL: "http://localhost:3001/searches",
  responseType: "json",
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export const SearchRequest = async (data: parameter) => {
  const searchTasks = await option.get("/", { data });
};
