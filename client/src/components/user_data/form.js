import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import axios from "axios";

/*- Nombre y apellido
- Fecha de nacimiento.
- Nacionalidad
- Documento nacional de identidad.
- Una imágen de su documento nacional de identidad.
- Domicilio completo.
- Una imágen de una prueba de domicilio.*/

class UserDataForm extends Component {
	constructor() {
		super();
		this.state = {
			startDate: new Date(),
			countries: []
		};
	}
	async componentDidMount() {
		let $countries = [],
			$request;
		try {
			$request = await this.getCountries();
			$countries = $request.data.map(countryData => {
				return { name: countryData.name, code: countryData.alpha3Code };
			});
		} catch (er) {
			console.log(er);
		}
		this.setState({ countries: $countries });
	}

	async getCountries() {
		const API = "https://restcountries.eu/rest/v2/all";
		return axios.get(API);
	}

	handleChange = date => {
		this.setState({
			startDate: date
		});
	};

	render() {
		return (
			<Form>
				<Form.Row>
					<Form.Group as={Col} controlId='nombre-apellido'>
						<Form.Label>Nombre y Apellido</Form.Label>
						<Form.Control type='text' placeholder='...' />
					</Form.Group>
				</Form.Row>

				<Form.Group controlId='date-birth'>
					<Form.Label id='date-birth-label'>Fecha de Nacimiento</Form.Label>
					<Datepicker
						id='date-birth'
						selected={this.state.startDate}
						onChange={this.handleChange}
					/>
				</Form.Group>

				<Form.Group controlId='nacionalidad'>
					<Form.Label>Nacionalidad</Form.Label>
					<Form.Control as='select'>
						{this.state.countries.map(country => (
							<option value={country.code} key={country.code}>
								{" "}
								{country.name}{" "}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Row>
					<Form.Group as={Col} controlId='dni'>
						<Form.Label>DNI</Form.Label>
						<Form.Control type='text' placeholder='...' />
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId='domicilio'>
						<Form.Label>Domicilio</Form.Label>
						<Form.Control type='text' placeholder='...' />
					</Form.Group>
				</Form.Row>

				<Form.Row>
					<Form.Group as={Col} controlId='formGridCity'>
						<Form.Label>Ciudad</Form.Label>
						<Form.Control />
					</Form.Group>

					<Form.Group as={Col} controlId='formGridState'>
						<Form.Label>Provincia</Form.Label>
						<Form.Control as='select'>
							<option>Choose...</option>
							<option>...</option>
						</Form.Control>
					</Form.Group>

					<Form.Group as={Col} controlId='formGridZip'>
						<Form.Label>C.P / Zip</Form.Label>
						<Form.Control />
					</Form.Group>
				</Form.Row>

				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		);
	}
}
export default UserDataForm;
