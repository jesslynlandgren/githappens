import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import Issues from "./components/Issues/Issues";
import { IIssue } from "./components/Issue/Issue";

export default class App extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      issues: fakeIssues
    }
  }

  render() {
    return (

      <div><Issues issues={this.state.issues} handleClick={this.handleClick}/></div>
    );
  }

  handleClick = (issue: IIssue) => {
    console.log("handling click");
    const newIssue = {
      ...issue,
      votes: issue.votes + 1,
    }
    const newIssues = this.state.issues.map((issue: IIssue, index: number) => {
      if (issue.title === newIssue.title) {
        return newIssue
      } else {
        return issue;
      }
    })
    console.log({newIssues})
    this.setState({issues: newIssues});
  }
}

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
