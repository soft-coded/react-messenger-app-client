import React, { useRef } from "react"
import { Modal, Form, Button } from "react-bootstrap"

import { useContacts } from "../contexts/ContactsContext"

export default function ContactModal({ closeModal }) {
	const idRef = useRef()
	const nameRef = useRef()
	const { createContacts } = useContacts()
	function handleSubmit(e) {
		e.preventDefault()
		createContacts(idRef.current.value, nameRef.current.value)
		closeModal()
	}
	return (
		<>
			<Modal.Header className="bg-dark">
				<Modal.Title>Add Contact</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-dark">
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Contact ID:</Form.Label>
						<Form.Control ref={idRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Name:</Form.Label>
						<Form.Control ref={nameRef} required />
					</Form.Group>
					<Button type="submit" className="mr-2">
						Add
					</Button>
					<Button variant="secondary" onClick={closeModal}>
						Close
					</Button>
				</Form>
			</Modal.Body>
		</>
	)
}
