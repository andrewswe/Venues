import React, { Component } from "react";
import "./create-review.css";
import StarIcon from "../../icons/star";


export default class StarRating extends Component {
	constructor(props){
		super(props);

		this.stars = [0, 1, 2, 3, 4];
		this.state = {
			highest: -1
		};
	}

	update(i) {
		return e =>
		 this.setState({
			highest: i
		});
	}

	render() {
		return (
				<div className="create-review__stars">
					{this.stars.map((i) => (
						<StarIcon
							key={i}
							id={i}
							onMouseOver={this.update(i)}
							onMouseLeave={this.props.setRating}
							filled={i <= this.state.highest ? "true" : "false"} />
					))}
				</div>
			);
	}
}
