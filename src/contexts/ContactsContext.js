import React, { useContext } from "react"

import useLocalStorage from "../hooks/useLocalStorage"

const ContactsContext = React.createContext()
export function useContacts() {
	return useContext(ContactsContext)
}

export default function ContactsProvider({ children }) {
	const [contacts, setContacts] = useLocalStorage("contacts", [])
	function createContacts(id, name) {
		setContacts(prevConts => {
			return [...prevConts, { id, name }]
		})
	}
	return (
		<ContactsContext.Provider value={{ contacts, createContacts }}>
			{children}
		</ContactsContext.Provider>
	)
}
