import { Button, Icon, Layout, Menu, Modal, Typography } from "antd";
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
const { Title } = Typography;

const StyledIssuesContainer = styled.div`
	background-color: #fff;
`;

const StyledContent = styled(Content)`
	background-color: #fff;
`;

const StyledIssueToolbar = styled.div`
	display: flex;
	justify-content: space-between;
	padding: .75em;
`;

const StyledIssueListTitle = styled.div`
	font-size: 1.5em;
	font-weight: bold;
`;

const StyledIssueHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5em;
`;

const StyledIssueActions = styled.div`
	display: flex;
	align-items: center;

	> * {
		margin-left: .5em;
	}
`;

const StyledLikedIcon = styled(Icon)`
`;

const StyledUpvotes = styled.div`
	margin-right: .5em;
	font-size: 1.25em;
`;

const StyledUpvoteIcon = styled.span`
	margin-right: .2em;
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
				<StyledIssuesContainer>
					<StyledIssueToolbar>
						<StyledIssueListTitle className="listTitle">
							Oh git! I accidentally...
						</StyledIssueListTitle>
						<Button
							type="primary"
							onClick={() => this.toggleCreateModal(true)}
						>
							Add New
						</Button>
					</StyledIssueToolbar>
					<Layout>
						<Sider>
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
							{this.state.selectedIssue &&
								<div>
									<StyledIssueHeader>
										<div>
											<Title level={4}>...{this.state.selectedIssue.title}</Title>
										</div>
										<StyledIssueActions>
											<StyledUpvotes>
												<StyledUpvoteIcon>
													{(true) ?
														<StyledLikedIcon type="heart" theme="filled" />
													:
														<Icon type="heart" theme="outlined" />
													}
												</StyledUpvoteIcon>
												<span>{this.state.selectedIssue.votes}</span>
											</StyledUpvotes>
											<Button
												type="danger"
												ghost={true}
												icon="delete"
												onClick={() => this.deleteIssue(this.state.selectedIssue.id)}
											/>
											<Button
												type="primary"
												ghost={true}
												icon="edit"
												onClick={() => this.editIssue(this.state.selectedIssue.id)}
											/>
										</StyledIssueActions>
									</StyledIssueHeader>
								</div>
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
				
				</StyledIssuesContainer>
			</Layout>
			

		);
	}

	public selectIssue = (menuSelection: any) => {
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

	public editIssue = (id: string) => {
		console.log("do nothing");
	}
}
