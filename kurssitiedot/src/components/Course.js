import React from 'react';

const Header = props =>
  <h1>{props.course}</h1>

const Total = props => {
  const total = props.parts.reduce((acc, cur) => acc += cur.exercises, 0);

  return <p>yhteensä {total} tehtävää</p>
}
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
  <div>
    {props.parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Course = ({ courses }) => {
  return (
      courses.map(course => 
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
  )
}

export default Course;