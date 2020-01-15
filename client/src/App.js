import React from "react";
import Home from "./components/home";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Container fluid={true}>
			<Home />
		</Container>
	);
}

export default App;
