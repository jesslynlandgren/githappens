import { Button, Layout, Menu, Modal, PageHeader, Tag } from "antd";
import * as _ from "lodash";
import React from "react";
import styled from "styled-components";
import firebase from "../../firebase/firebase";

export interface IIssue {
	id: string;
	title: string;
	votes: number;
}

const { Content, Sider } = Layout;

const StyledContent = styled(Content)`
	background-color: #fff;
`;

const StyledIssueListTitle = styled.div`
	padding: .75em;
	font-size: 1.1em;
	font-weight: bold;
`;

const StyledIssueToolbar = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: .75em;
`;

export default class Issues extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			isCreatingIssue: false,
			issues: [],
			selectedIssue: null,
		};
	}

	public componentWillMount() {
		const issuesRef = firebase.database().ref("issues");
		issuesRef.on("value", (snapshot: any) => {
			const issues = _.map(snapshot.val(), (issue: IIssue, key: string) => {
				return {...issue, ...{id: key}};
			});
			this.setState({
				issues,
				selectedIssue: issues[0],
			});
			console.log("set selected issue");
		});
	}

	public render() {
		return (
			<Layout>
				<Sider style={{ backgroundColor: "#fff" }}>
					<StyledIssueListTitle className="listTitle">
						Oh git! I accidentally...
					</StyledIssueListTitle>
					<Menu
						mode="inline"
						onSelect={this.selectIssue}
					>
						{this.state.issues.map((issue: IIssue) => {
							return (
								<Menu.Item key={issue.id}>
									<span>
										{issue.title}
									</span>
								</Menu.Item>
							);
						})}
					</Menu>
				</Sider>
				<StyledContent>
					<StyledIssueToolbar>
						<Button
							type="primary"
							ghost={true}
							onClick={() => this.toggleCreateModal(true)}
						>
								Add New
						</Button>
					</StyledIssueToolbar>
						{this.state.selectedIssue &&
							<PageHeader
								title={this.state.selectedIssue.title}
								subTitle={this.state.selectedIssue.title}
								tags={<Tag color="red">Warning</Tag>}
								extra={[
									<Button
										key="2"
										type="danger"
										ghost={true}
										icon="delete"
										onClick={() => this.deleteIssue(this.state.selectedIssue.id)}
									/>,
									<Button
										key="1"
										type="primary"
										icon="edit"
									/>,
								]}
							/>
						}
					<Modal
						visible={this.state.isCreatingIssue}
						title="Create New Issue"
						onCancel={() => this.toggleCreateModal(false)}
						onOk={()  => this.createIssue({title: "Test Issue Yay", votes: 0})}
						okText="Save"
					>
						test text
					</Modal>
				</StyledContent>
			</Layout>

		);
	}

	public selectIssue = (menuSelection: any) => {
		console.log("selecting issue", menuSelection);
		const issue = _.find(this.state.issues, {id: menuSelection.key});
		this.setState({selectedIssue: issue});
	}

	public toggleCreateModal(isOpen: boolean) {
		this.setState({isCreatingIssue: isOpen});
	}

	public createIssue = (issue: Partial<IIssue>) => {
		const itemsRef = firebase.database().ref("issues");
		itemsRef.push(issue);
		this.toggleCreateModal(false);
	}

	public deleteIssue = (id: string) => {
		const issueRef = firebase.database().ref(`/issues/${id}`);
		issueRef.remove();
	}
}
