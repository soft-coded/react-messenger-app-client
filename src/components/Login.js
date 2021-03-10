import React, { useRef } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { v4 as uuidV4 } from "uuid"

export default function Login({ setId }) {
	const idRef = useRef()
	function handleSubmit(e) {
		e.preventDefault()
		setId(idRef.current.value)
	}
	function createAccount() {
		setId(uuidV4())
	}

	return (
		<Container
			className="text-light d-flex align-items-center justify-content-center"
			style={{ height: "100vh" }}
		>
			<Form className="w-100" onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Messenger ID:</Form.Label>
					<Form.Control ref={idRef} />
				</Form.Group>
				<Button type="submit" className="mr-4">
					Log In
				</Button>
				<Button variant="secondary" onClick={createAccount}>
					Create Account
				</Button>
			</Form>
		</Container>
	)
}
