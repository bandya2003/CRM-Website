import { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './Todo';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const Todos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data); // Trigger re-render
    setIsLoading(false); // Trigger re-render again
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      All TODOs
      {todos.map((todo, index) => (
        <Todo todo={todo} key={index} />
      ))}
    </>
  );
};

export default Todos;
