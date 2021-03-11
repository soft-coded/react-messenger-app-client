import React, { useRef } from "react"
import { Form, Button } from "react-bootstrap"
import { useConversations } from "../contexts/ConversationsContext"

export default function OpenConversation() {
	const messageRef = useRef()
	const { sendMessage, selectedConversation } = useConversations()
	function handleSubmit(e) {
		e.preventDefault()
		sendMessage(
			selectedConversation.receivers.map(r => r.id),
			messageRef.current.value
		)
		messageRef.current.value = ""
	}
	return (
		<div className="d-flex flex-grow-1 flex-column">
			<div className="overflow-auto flex-grow-1">
				<div className="d-flex flex-column align-items-start justify-content-end px-3">
					{selectedConversation.messages.map((message, i) => (
						<div
							className={`my-1 d-flex flex-column ${
								message.fromMe
									? "align-self-end align-items-end"
									: "align-items-start"
							}`}
							key={i}
						>
							<div
								className={`rounded px-2 py-1 text-light ${
									message.fromMe ? "bg-primary" : "bg-secondary"
								}`}
							>
								{message.message}
							</div>
							<div
								className={`text-muted small ${
									message.fromMe ? "text-right" : ""
								}`}
							>
								{message.fromMe ? "You" : message.senderName}
							</div>
						</div>
					))}
				</div>
			</div>
			<Form onSubmit={handleSubmit} className="d-flex m-2">
				<Form.Control
					ref={messageRef}
					as="textarea"
					required
					style={{ height: 50, resize: "none", borderRadius: 0 }}
				/>
				<Button type="submit" className="rounded-0">
					Send
				</Button>
			</Form>
		</div>
	)
}
