import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import "./create-review.css";
import StarRating from "./starRating";

class CreateReview extends Component {
	constructor(){
		super();


		this.stars = [0, 1, 2, 3, 4];
		this.state = {
			rating: 0,
			author: '',
			review: '',
		};

		this.update = this.update.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.resetState = this.resetState.bind(this);
	}

	update(field) {
		return e => {
			let item = field === 'rating' ? parseInt(e.currentTarget.id, 0) + 1 : e.currentTarget.value;
			this.setState({
				[field]: item
			});
		};
	}

	resetState() {
		this.setState({
			rating: 0,
			author: '',
			review: ''
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onCreateReview({
			"author": this.state.author,
			"rating": this.state.rating,
			"comment": this.state.review
		});
		this.resetState();
	}

	render() {
		return <div className="create-review">
			<h3>Write a Review</h3>
			<form id="new-review-form" onSubmit={this.handleSubmit}>
				<label>Rate Your Experience</label>
				<StarRating setRating={this.update('rating')}/>
				<label htmlFor="create-review__author">Author</label>
				<input onChange={this.update('author')}
					id="create-review__author"
					value={this.state.author}
				/>
				<label htmlFor="create-review__comment">Review</label>
				<textarea onChange={this.update('review')}
					id="create-review__comment"
					value={this.state.review}
				/>
			<button onClick={this.handleSubmit}>
				Add Review
			</button>
			</form>
		</div>;
	}
}

const createReviewMutation = gql`
	mutation createReview(
		$author: String!,
		$rating: Int!,
		$comment: String!,
	) {
		createReview(
			author: $author
			rating: $rating
			comment: $comment
		) {
			id
			rating
			author
			comment
			created_at
		}
	}
`;

/**
 * You shouldn't have to modify any code below this comment
 */

export default function CreateReviewHOC(props) {
	return <Mutation
		mutation={createReviewMutation}
		update={(cache, { data: { createReview } }) => {
			const { reviews } = cache.readQuery({ query: props.getReviewsQuery });
			cache.writeQuery({
				query: props.getReviewsQuery,
				data: { reviews: [createReview].concat(reviews) }
			});
		}}
	>
		{(submitCreateReview, { data }) => (
			<CreateReview
				{...props}
				onCreateReview={variables => submitCreateReview({ variables })}
			/>
		)}
	</Mutation>;
}
