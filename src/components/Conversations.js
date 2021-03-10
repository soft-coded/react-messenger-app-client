import React from "react"
import { ListGroup } from "react-bootstrap"

import { useConversations } from "../contexts/ConversationsContext"

export default function Conversations() {
	const { conversations, selectConversationIndex } = useConversations()
	return (
		<ListGroup variant="flush">
			{conversations.map((convo, i) => (
				<ListGroup.Item
					key={i}
					action
					active={convo.selected}
					onClick={() => selectConversationIndex(i)}
					className="border-bottom text-center"
				>
					{convo.receivers.map(receiver => receiver.name).join(", ")}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
}
