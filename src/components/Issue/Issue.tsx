import React from "react";

export interface IIssueProps {
	issue: IIssue;
}

export interface IIssue {
	title: string;
	votes: number;
}

const Issue: React.FC<IIssueProps> = (props) => {
	return (

		<div style="display: flex">
			<div>
				{props.issue.title}
			</div>
			<div>
				<i class=""></i>
			</div>

		</div>
	);
};

export default Issue;
