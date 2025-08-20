const Form = ({ newName, newNumber, handleAddPerson, 
    handleAddNumber, addPerson }) => {
        return (
      <form onSubmit={addPerson}>
        <div>
          <label>
            Name:
            <input
              value={newName}
              onChange={handleAddPerson}
            />
          </label>
        </div>
        <div>
          <label>
            Number:
            <input
              value={newNumber}
              onChange={handleAddNumber}
            />
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form