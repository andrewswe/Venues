import React, { Component, Fragment } from "react";
import "./app.css";
import Header from "./header";
import Hero from "./hero";
import Navigation from "./navigation";
import Overview from "./overview";
import Reviews from "./reviews";

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			language: "english",
			component: "Overview"
		};
		this.update = this.update.bind(this);
	}

	update(field) {
		return (e) => {
				let item = field === 'component' ? e.currentTarget.dataset.tag : e.currentTarget.value;
				this.setState({
				[field]: item
			});
		};
	}

	render() {
		let ProperComponent = this.state.component === "Overview" ? Overview : Reviews;
		return <Fragment>
			<Header language={this.state.language} setLanguage={this.update('language')} />
			<Hero />
			<Navigation state={this.state.component} setComponent={this.update('component')}/>
			<ProperComponent language={this.state.language}/>
		</Fragment>;
	}
}
