import React from "react";
import "./App.css";
import Header from "./components/header/header";
import Issues from "./components/Issues/Issues";
import { IIssue } from "./components/Issue/Issue";

const fakeIssues: IIssue[] = [
  {
    title: "Issue One",
    votes: 0,
  },
  {
    title: "Issue Two",
    votes: 1,
  }
];

const App: React.FC = () => {
	return (

		<div><Issues issues={fakeIssues}/></div>
	);
};

export default App;
