import React, { useContext, useState, useEffect, useCallback } from "react"

import useLocalStorage from "../hooks/useLocalStorage"
import { useContacts } from "./ContactsContext"
import { useSocket } from "./SocketContext"

const ConversationsContext = React.createContext()
export function useConversations() {
	return useContext(ConversationsContext)
}

export default function ContactsProvider({ children, currentUserId }) {
	const [conversations, setConversations] = useLocalStorage("conversations", [])
	const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
	const { contacts } = useContacts()
	const { socket } = useSocket()

	function createConversations(receivers) {
		setConversations(prevConvs => {
			return [...prevConvs, { receivers, messages: [] }]
		})
	}
	const editedConversations = conversations.map((convo, i) => {
		const receivers = convo.receivers.map(receiver => {
			const contact = contacts.find(contact => contact.id === receiver)
			const name = (contact && contact.name) || receiver
			return { id: receiver, name }
		})

		const messages = convo.messages.map(message => {
			const contact = contacts.find(contact => contact.id === message.sender)
			const name = (contact && contact.name) || message.sender
			const fromMe = currentUserId === message.sender
			return { ...message, senderName: name, fromMe: fromMe }
		})

		const selected = i === selectedConversationIndex

		return { ...convo, receivers, selected, messages }
	})

	const addMessage = useCallback(
		({ receivers, sender, message }) => {
			setConversations(prevConvos => {
				let isNewConvo = true
				const newMessage = { sender: sender, message }
				const newConvos = prevConvos.map(convo => {
					if (arrayEqual(convo.receivers, receivers)) {
						isNewConvo = false
						return {
							...convo,
							messages: [...convo.messages, newMessage]
						}
					}

					return convo
				})

				if (isNewConvo)
					return [...prevConvos, { receivers, messages: [newMessage] }]
				else return newConvos
			})
		},
		[setConversations]
	)

	function sendMessage(receivers, message) {
		socket.emit("send-message", { receivers, message })
		addMessage({ receivers, message, sender: currentUserId })
	}

	useEffect(() => {
		if (socket == null) return

		socket.on("receive-message", addMessage)
		return () => socket.off("receive-message")
	}, [socket, addMessage])

	return (
		<ConversationsContext.Provider
			value={{
				conversations: editedConversations,
				selectedConversation: editedConversations[selectedConversationIndex],
				createConversations,
				selectConversationIndex: setSelectedConversationIndex,
				sendMessage
			}}
		>
			{children}
		</ConversationsContext.Provider>
	)
}

function arrayEqual(a, b) {
	if (a.length !== b.length) return false

	a.sort()
	b.sort()

	return a.every((element, i) => element === b[i])
}
