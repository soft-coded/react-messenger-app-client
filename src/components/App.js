import React from "react"

import Login from "./Login"
import useLocalStorage from "../hooks/useLocalStorage"
import Dashboard from "./Dashboard"
import ContactsContext from "../contexts/ContactsContext"
import ConversationsContext from "../contexts/ConversationsContext"
import SocketContext from "../contexts/SocketContext"

export default function App() {
	const [id, setId] = useLocalStorage("id")
	return id ? (
		<SocketContext id={id}>
			<ContactsContext>
				<ConversationsContext currentUserId={id}>
					<Dashboard id={id} />
				</ConversationsContext>
			</ContactsContext>
		</SocketContext>
	) : (
		<Login setId={setId} />
	)
}
