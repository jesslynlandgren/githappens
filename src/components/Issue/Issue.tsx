import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export interface IIssueProps {
	issue: IIssue;
	handleClick: (issue: IIssue) => void;
}

export interface IIssue {
	title: string;
	votes: number;
}

const Issue: React.FC<IIssueProps> = (props) => {
	return (

		<div>
			<div>
				{props.issue.title}
			</div>
			<div>
				{props.issue.votes}
			</div>
			<div  onClick={() => props.handleClick(props.issue)}>
				<FontAwesomeIcon icon={faThumbsUp}/>
			</div>


		</div>
	);
};

export default Issue;
