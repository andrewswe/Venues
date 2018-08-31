import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import "./review.css";
import StarIcon from "../../icons/star";
import TrashIcon from "../../icons/trash";

function Review({
	onDeleteReview,
	review: {
		id,
		rating,
		author,
		comment,
		created_at
	} = {}
}) {
	let date = new Date(created_at) ;
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getDate();


	let names = author.split(' ');
	let first = names[0][0];
	let last = names[1] ? names[1][0] : '';
	return <tr className="review">
		<td className="review__initials">
			<div className="review__initials__icon">
				{first + last}
			</div>
		</td>
		<td className="review__info">
			<div className="review__info__author">
				{author}
			</div>
			<div className="review__info__date">
				{month + '/' + day + '/' + year}
			</div>
		</td>
		<td className="review__details">
			<div className="review__details__rating">
				{getStars(rating).map( i =>
					<StarIcon key={i} filled="true" />
				)}
			</div>
			<div className="review__details__comment">
				{comment}
			</div>
		</td>
		<td className="review__delete">
			<TrashIcon onClick={e => onDeleteReview({"id" : id})}/>
		</td>
	</tr>;
}

const getStars = (quant) => {
	let stars = [];
	for(let i = 0; i < quant; i++) {
		stars.push(i);
	}
	return stars;
};

const deleteReviewMutation = gql`
	mutation deleteReview(
		$id: String!
	) {
		deleteReview(
			id: $id
		) {
			id
		}
	}
`;

export default function DeleteReviewHOC(props) {
	return <Mutation
		mutation={deleteReviewMutation}
		update={(cache, { data: { deleteReview } }) => {
			const { reviews } = cache.readQuery({ query: props.getReviewsQuery });
			cache.writeQuery({
				data: { reviews: reviews }
			});
		}}
	>
		{(submitDeleteReview, { data }) => (
			<Review
				{...props}
				onDeleteReview={variables => submitDeleteReview({ variables })}
			/>
		)}
	</Mutation>;
}
