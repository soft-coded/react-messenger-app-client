import { useState, useEffect } from "react"

const PRE = "messenger-clone-"

export default function useLocalStorage(key, initialValue) {
	const editedKey = PRE + key
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(editedKey)
		if (storedValue != null) return JSON.parse(storedValue)
		if (typeof initialValue === "function") return initialValue()
		else return initialValue
	})

	useEffect(() => {
		localStorage.setItem(editedKey, JSON.stringify(value))
	}, [editedKey, value])

	return [value, setValue]
}
