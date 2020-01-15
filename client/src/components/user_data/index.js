import React, { Component } from "react";
import { Col } from "react-bootstrap";
import UserDataForm from "./form";

class UserData extends Component {
	render() {
		return (
			<Col xs='12'>
				<h1> User Data </h1>
				<UserDataForm />
			</Col>
		);
	}
}
export default UserData;
