import '../styles/todo.css';

const Todo = ({ todo }) => (
  <div className="todo">
    <div>{`Name : ${todo.name}`}</div>
    <div>{`Email : ${todo.email}`}</div>
  </div>
);

export default Todo;
