import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"

import { useContacts } from "../contexts/ContactsContext"
import { useConversations } from "../contexts/ConversationsContext"

export default function ConversationModal({ closeModal }) {
	const [selectedContacts, setSelectedContacts] = useState([])
	const { contacts } = useContacts()
	const { createConversations } = useConversations()
	function handleCheckChange(id) {
		setSelectedContacts(prev => {
			if (selectedContacts.includes(id))
				return prev.filter(prevId => prevId !== id)
			else return [...prev, id]
		})
	}
	function handleSubmit(e) {
		e.preventDefault()
		createConversations(selectedContacts)
		closeModal()
	}

	return (
		<>
			<Modal.Header className="bg-dark">
				<Modal.Title>New Conversation</Modal.Title>
			</Modal.Header>
			<Modal.Body className="bg-dark">
				<Form onSubmit={handleSubmit}>
					{contacts.map(contact => (
						<Form.Group controlId={contact.id} key={contact.id}>
							<Form.Check
								type="checkbox"
								value={selectedContacts.includes(contact.id)}
								label={contact.name}
								onChange={() => handleCheckChange(contact.id)}
							/>
						</Form.Group>
					))}
					<Button type="submit" className="mr-2">
						Create
					</Button>
					<Button variant="secondary" onClick={closeModal}>
						Close
					</Button>
				</Form>
			</Modal.Body>
		</>
	)
}
