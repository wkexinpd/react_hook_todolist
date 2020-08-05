import React,{useState,useCallback,useRef,useEffect} from 'react';
import './App.css';

let idSeq = Date.now()
let LS_KEY = "todos"
function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()
 
  const onSubmit = (e) =>{
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    if(newText.length === 0){
      return
    }
    addTodo(
      {
        id: ++idSeq,
        text: newText,
        complete: false
      }
    )
    inputRef.current.value = ''
  }

  return (
    <div className="control">
      <h1>
        todos
      </h1>
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          ref = {inputRef}
          className="new-todo"
          placeholder="what needs to be done?"
        />
      </form>
    </div>
  )
}

function TodoItem(props){
  const {todo:{id,text,complete},removeTodo,toggleTodo} = props

  const onChange = () => {
    toggleTodo(id)
  }

  const onRemove = () => {
    removeTodo(id)
  }

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete}/> 
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>  
  )
}

function Todos(props) {
  const {todos,removeTodo,toggleTodo} = props
  return (
    <ul>
      {
        todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo = {toggleTodo}
              removeTodo = {removeTodo}
            />
          )
        })
      }
    </ul>
  )
}


function TodoList() {
  
  const [todos, setTodos] = useState([])

  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo])
  },[])

  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => {
      return todo.id !== id
    }))
  },[])

  const toggleTodo = useCallback((id) => {
    setTodos(todos => todos.map(item=>{
      return item.id===id
      ?{
        ...item,
        complete: !item.complete
      }:item
    }))
  },[])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY)||'[]')
    setTodos(todos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY,JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      <Control addTodo={addTodo}/>
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}/>
    </div>
  )
  // const [count, setCount] = useState(0)
  // console.log('render')
  // return (
  //   <button
  //     type="button"
  //     onClick={() => {setCount(count+1)}}
  //   >
  //     click {count}
  //   </button>
  // );
}

export default TodoList;
