import { useState, useEffect } from 'react';
import style from './ToDoList.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from '../features/todoSlice';

const ToDoList = ()=> {

    const todos = useSelector((state) => state.todos);
    const [inputValue, setInputValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    const dispatch = useDispatch();
    
 // Загрузка задач из localStorage 
useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        savedTodos.forEach(todo => dispatch(addTodo(todo)));
    }
 },  [dispatch]);

// Сохранение задач в localStorage 
useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
 }, [todos]);

    function handleAddToDo () {
        if (inputValue.trim() && descriptionValue.trim()) {
            const newTodo = {id: Date.now(), text: inputValue, description: descriptionValue};
            dispatch(addTodo(newTodo));
            setInputValue('');
            setDescriptionValue('');
        } 
    }

    function handleDelToDo(id) {
        dispatch(removeTodo(id))        
    }

    return (
        <main>
        <div className={style.main}>
          <div className={style.ToDo}>
            <h2>Планирование</h2>
            <label> Добавление задачи</label>
              <input 
              type="text" 
              placeholder="Например: Закончить домашнюю работу" 
              value={inputValue}
              onChange={(e)=> setInputValue(e.target.value)}
              />
              <label> Описание задачи</label>
              <input 
              type="text" 
              placeholder="Например: Добавить стилизации" 
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              />
              <button className={style.btn} onClick={handleAddToDo}> Запланировать </button>
          </div>
          <ul className={style.ul}>
            <h2>Список дел</h2>
            {todos.length === 0 ? (<div className={style.none}> <img className={style.img} src="https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-cute-sloth-clipart-cute-sloth-in-leaves-vector-cartoon-png-image_6867708.png" alt="Задач нет!" /><p className={style.none_p}>На сегодня ничего не запланированно</p></div> ) : (todos.map((todo) => (
                            <li key={todo.id} className={style.li}>
                                <div>
                                    <h3>{todo.text}</h3>
                                    <br />
                                    <i>{todo.description}</i>
                                </div>
                                <button className={style.btn} onClick={() => handleDelToDo(todo.id)}>Удалить</button>
                            </li>
                        ))
                    )}
          </ul>
        </div>
        
        </main>
    )
}

export default ToDoList