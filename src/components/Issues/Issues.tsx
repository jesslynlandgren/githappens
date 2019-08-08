import React from "react";
import Issue, { IIssue } from "../Issue/Issue";

export interface IIssuesProps {
	issues: IIssue[];
	handleClick: (issue: IIssue) => void;
}

const Issues: React.FC<IIssuesProps> = (props) => {
	return (
		// <div>Issues List</div>
		<React.Fragment>
			{props.issues.map((issue) => {
				return <Issue issue={issue} handleClick={props.handleClick}></Issue>
			})}
		</React.Fragment>
	);
};

export default Issues;
