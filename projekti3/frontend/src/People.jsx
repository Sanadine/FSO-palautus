const People = ({ persons, handleDeletePerson }) => {
    return (
        <ul>
        {persons.map((person, index) => (
          <li key={index}>
            {person.name} {person.number}
            <button onClick={() => handleDeletePerson(person.id, person.name)}>Delete</button>  
          </li>
        ))}
      </ul>
    )
}

export default People