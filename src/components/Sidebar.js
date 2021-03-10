import React, { useState } from "react"
import { Tab, Nav, Button, Modal } from "react-bootstrap"

import Conversations from "./Conversations"
import ConversationModal from "./ConversationModal"
import ContactModal from "./ContactModal"
import Contacts from "./Contacts"

export default function Sidebar({ id }) {
	const [activeKey, setActiveKey] = useState("conversations")
	const [showModal, setShowModal] = useState(false)
	const buttonText = activeKey === "conversations" ? "Conversation" : "Contact"
	return (
		<div style={{ width: 350 }} className="d-flex flex-column">
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				<Nav variant="tabs" className="justify-content-center">
					<Nav.Item>
						<Nav.Link eventKey="conversations">Conversations</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="contacts">Contacts</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content className="border-right overflow-auto flex-grow-1">
					<Tab.Pane eventKey="conversations">
						<Conversations />
					</Tab.Pane>
					<Tab.Pane eventKey="contacts">
						<Contacts />
					</Tab.Pane>
				</Tab.Content>
				<div className="text-secondary border-top border-right p-2 small">
					Your ID: {id}
				</div>
				<Button
					className="rounded-0 border-right"
					onClick={() => setShowModal(true)}
				>
					New {buttonText}
				</Button>
			</Tab.Container>
			<Modal
				className="text-light"
				show={showModal}
				onHide={() => setShowModal(false)}
			>
				{activeKey === "conversations" ? (
					<ConversationModal closeModal={() => setShowModal(false)} />
				) : (
					<ContactModal closeModal={() => setShowModal(false)} />
				)}
			</Modal>
		</div>
	)
}
