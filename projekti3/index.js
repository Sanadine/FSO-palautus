const express = require('express');
const app = express();

app.use(express.json())

let persons = [
    {
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": "1"
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": "2"
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": "3"
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": "4"
    }
  ]
    }
];  

app.get( '/', (request, response) => {
    response.send('<h1>Welcome to the Phonebook API</h1>');
    });

app.get('/api/persons', (request, response) => {
  response.json(persons[0].persons);
});

app.get('/info', (request, response) => {
  const personMany = persons[0].persons.length;
  const timeNow = new Date().toString();
  response.send(`<p>Phonebook has info for ${personMany} people</p><p>${timeNow}</p>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const plist = persons[0].persons;
  const person = plist.find(p => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).json({ error: 'Person not found' });
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const pList = persons[0].persons;
  persons[0].persons = pList.filter(p => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const { name, number} = request.body;
    if (!name || !number) {
        return response.status(400).json({ 
            error: 'Name or number is missing' });
    }
   
    const pList = persons[0].persons;
    const notNewPerson = pList.find(p => p.name === name);
    if (notNewPerson) {
        return response.status(400).json({ 
            error: 'Name must be unique' });
    }  

  const addPerson = {
    name,
    number,
    id: (Math.random() * 1000).toFixed(0),
  }
  console.log(addPerson)
  response.json(addPerson);
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}/`); 
