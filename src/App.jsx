import { useState } from 'react';
import ToDoList from './components/ToDoList';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}.${month < 10 ? '0' + month : month}.${year} года`;
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Список задач на {getDate()}</h1>
      <ToDoList />
    </main>
  )
}

export default App
