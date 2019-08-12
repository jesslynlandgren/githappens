import { Breadcrumb } from "antd";
import React from "react";
import styled from "styled-components";

export interface IBreadcrumbsProps {
	breadcrumbs: IBreadcrumb[];
}

export interface IBreadcrumb {
	title: string;
}

const StyledBreadcrumb = styled(Breadcrumb)`
	padding: 1em 0;
`;

const Breadcrumbs: React.FC<IBreadcrumbsProps> = (props) => {
	return (
		<StyledBreadcrumb>
			{props.breadcrumbs.map((breadcrumb: IBreadcrumb, index: number) => {
				return (
					<Breadcrumb.Item key={index}>
						{breadcrumb.title}
					</Breadcrumb.Item>
				)
			})}
		</StyledBreadcrumb>
	);
};

export default Breadcrumbs;
