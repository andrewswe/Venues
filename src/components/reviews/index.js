import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./reviews.css";
import StarIcon from "../icons/star";
import Review from "./review";
import CreateReview from "./create-review";

function Reviews({ reviews, getReviewsQuery }) {
	let total = 0, avgRating;

	for(let rvw of reviews){
		total += rvw.rating;
	}

	const length = reviews.length;
	const ratingStars = [];
	avgRating = Math.ceil(total / length);

	for(let i = 0; i < 5; i++) {
		ratingStars.push(i);
	}
	return <div className="reviews">
		<div className="reviews__header">
			<h2>Reviews</h2>
			<div className="reviews__header__stars">
				<div className="average-rating-stars">
					{ratingStars.map((id) => (
						<StarIcon key={id} filled={(id < avgRating).toString()} />
					))}
				</div>
				{`(${length} reviews)`}
			</div>
		</div>
		{length ? <hr /> : ""}
		<table>
			<tbody>
				{reviews.map(r => (
					<Review key={r.id} review={r} getReviewsQuery={getReviewsQuery} />
				))}
			</tbody>
		</table>
		<hr />
		<CreateReview getReviewsQuery={getReviewsQuery} />
	</div>;
}

/**
 * You shouldn't have to modify any code below this comment
 */

const getReviews = gql`
	query getReviews {
		reviews {
			id
			rating
			author
			comment
			created_at
		}
	}
`;

export default function ReviewsHOC(props) {
	return <Query query={getReviews}>
		{({ data }) => (
			<Reviews
				{...props}
				getReviewsQuery={getReviews}
				reviews={data && data.reviews || []} // eslint-disable-line no-mixed-operators
			/>
		)}
	</Query>;
}
