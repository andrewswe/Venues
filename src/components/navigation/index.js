import React from "react";
import "./navigation.css";

export default function Navigation(props) {
	return <div className="navigation">
		<a
			onClick={props.setComponent}
			data-tag="Overview"
			className={props.state === "Overview" ? "is-selected": ''}
		>
			Overview
		</a>
		<a
			onClick={props.setComponent}
			data-tag="Reviews"
			className={props.state === "Reviews" ? "is-selected": ''}
		>
			Reviews
		</a>
	</div>;
}
