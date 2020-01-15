import React, { Component } from "react";
import { Col } from "react-bootstrap";
import UserData from "../user_data";

class Home extends Component {
	render() {
		return (
			<Col xs='12'>
				<h1> HOME </h1>
				<UserData />
			</Col>
		);
	}
}
export default Home;
