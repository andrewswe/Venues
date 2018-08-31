import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "./hero.css";

class Hero extends Component {
	constructor(props)	{
		super(props);

		this.state = {
			img: 0,
		};
		this.update = this.update.bind(this);
	}

	update(direction) {
		let curr = this.state.img;
		let increment = direction === 'left' ? -1 : 1;

		if(curr === 0 && direction === 'left'){
			curr = 3;
		}else if(curr === 2 && direction === 'right'){
			curr = -1;
		}

		return (e) => {
				this.setState({
				img: curr + increment
			});
		};
	}

	render() {
		const { listing: { images = [], location = {}, name } = {}} = this.props;
		let addy = location.city + ', ' + location.state + ', ' + location.country
		return <div className="hero">
			<img src={images[this.state.img]} alt="listing" />
			<a
				onClick={this.update('left')}
				className="hero__arrow hero__arrow--left">
				◀
			</a>
			<a
				onClick={this.update('right')}
				className="hero__arrow hero__arrow--right">
				▶
			</a>
			<div className="hero__info">
				<h3>{addy}</h3>
				<h1>{name}</h1>
			</div>
		</div>;
	}
}

const getHero = gql`
	query getHero {
		listing {
			name
			location {
				city
				state
				country
			}
			images
		}
	}
`;

/**
 * You shouldn't have to modify any code below this comment
 */

export default function HeroHOC(props) {
	return <Query
		query={getHero}
	>
		{({ data }) => (
			<Hero
				{...props}
				listing={data && data.listing || {}} // eslint-disable-line no-mixed-operators
			/>
		)}
	</Query>;
}
