import React, { Component } from "react";
import storage from "../../firebase";
import { Col, ProgressBar } from "react-bootstrap";
import "./index.css";

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
					picture: $url,
					uploadValue: 0
				});
			}
		);
	}

	render() {
		return (
			<div className='no-gutters'>
				<Col xs='12' className='custom-file'>
					<input
						type='file'
						id='customFile'
						className='custom-file-input'
						onChange={this.handleOnChange.bind(this)}
					/>
					<label class='custom-file-label'></label>
				</Col>

				<Col xs='12' className='progress-wrapper'>
					{this.state.uploadValue > 0 && (
						<ProgressBar
							animated
							label
							max='100'
							now={this.state.uploadValue}
						/>
					)}
				</Col>

				{this.state.picture !== "" && (
					<Col xs='12' className='dni-img-wrapper'>
						<img
							alt='DNI Prueba'
							title='DNI Prueba'
							className='mx-auto d-block img-fluid'
							src={this.state.picture}
						/>
					</Col>
				)}
			</div>
		);
	}
}

export default ImageUpload;
