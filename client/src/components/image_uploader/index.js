import React, { Component } from "react";
import storage from "../../firebase";
import { Col } from "react-bootstrap";

class ImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadValue: 0,
			picture: ""
		};
	}

	handleOnChange(event) {
		const file = event.target.files[0];
		const storageRef = storage.ref(`pictures/${file.name}`);
		const task = storageRef.put(file);

		task.on(
			"state_changed",
			snapshot => {
				let percentage =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				this.setState({
					uploadValue: percentage
				});
			},
			error => {
				console.error(error.message);
			},
			async () => {
				// Upload complete
				let $url = await task.snapshot.metadata.ref.getDownloadURL();
				this.setState({
					picture: $url
				});
			}
		);
	}

	render() {
		return (
			<Col xs='12'>
				<progress value={this.state.uploadValue} max='100'>
					{this.state.uploadValue} %
				</progress>
				<br />
				<input type='file' onChange={this.handleOnChange.bind(this)} />
				<br />
				<img width='90' alt='123' title='123' src={this.state.picture} />
			</Col>
		);
	}
}

export default ImageUpload;
