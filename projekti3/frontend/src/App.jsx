import { useState, useEffect } from 'react'
import Title from './Title'
import Form from './Form'
import People from './People'
import personsService from './services/persons'
import Message from './Message'

const App = () => {  
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personsService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  const handleAddPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = { 
      name: newName, 
      number: newNumber 
    }
    personsService
      .create(personObject)
      .then(response => {
        console.log(response.data)
      })
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    handleNotification(`Added ${newName}`)
    console.log("Uusi yhteystieto lisätty")
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
    personsService
      .del(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        handleNotification(`Deleted ${name}`)
      })
      console.log("Yhteystieto poistettu")
  }
  }

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Title text="Phonebook" />
      <Message message={notification} />
      <Form 
        newName={newName} 
        newNumber={newNumber} 
        handleAddPerson={handleAddPerson} 
        handleAddNumber={handleAddNumber} 
        addPerson={addPerson} 
      />
      <Title text="Numbers" />
      <People persons={persons} handleDeletePerson={handleDeletePerson}  />
    </div>
  )
}

export default App