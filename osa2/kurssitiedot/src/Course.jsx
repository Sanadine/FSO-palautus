const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Total of {total} exercises</p>
}

const Course = ({ course }) => {
  return (
    <div>
      {course.map(course => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <ul>
            {course.parts.map(part =>
              <li key={part.id}>
                {part.name} {part.exercises}
              </li>
            )}
          </ul>
          <Total parts={course.parts} />  
        </div>
      ))}
    </div>
  )
}

export default Course