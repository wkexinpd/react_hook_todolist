import React,{useState,useCallback,useRef,useEffect} from 'react';
import './App.css';
import {createAdd,createSet,createToggle,createRemove} from './actions';
import reducer from './reducers';

let idSeq = Date.now()
let LS_KEY = "todos"

function bindActionCreators(actionCreators, dispatch){
  const ret = {}
  for(let key in actionCreators){
    ret[key] = function(...args){
      const actionCreator = actionCreators[key]
      const action = actionCreator(...args)
      dispatch(action)
    }
  }
  return ret
}

function Control(props) {
  const { addTodo } = props
  const inputRef = useRef()
 
  const onSubmit = (e) =>{
    e.preventDefault()
    const newText = inputRef.current.value.trim()
    if(newText.length === 0){
      return
    }
    // addTodo(
    //   {
    //     id: ++idSeq,
    //     text: newText,
    //     complete: false
    //   }
    // )
    // dispatch({type:'add',payload:{
    //   id: ++idSeq,
    //   text: newText,
    //   complete: false
    // }})
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })
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
  const {todo:{id,text,complete},toggleTodo,removeTodo} = props

  const onChange = () => {
    // toggleTodo(id)
    // dispatch({type:'toggle',payload:id})
    // dispatch(createToggle(id))
    toggleTodo(id)
  }

  const onRemove = () => {
    // removeTodo(id)
    // dispatch({type:"remove",payload:id})
    // createRemove(id)
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
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
            />
          )
        })
      }
    </ul>
  )
}


function TodoList() {
  
  const [todos, setTodos] = useState([])
  const [incrementCount, setIncrementCount] = useState(0)

  /*
  const addTodo = useCallback((todo) => {
    // setTodos(todos => [...todos, todo])
    dispatch({type:'add',payload:todo})
  },[])

  const removeTodo = useCallback((id) => {
    // setTodos(todos => todos.filter(todo => {
    //   return todo.id !== id
    // }))
    dispatch({type:'remove',payload:id})
  },[])

  const toggleTodo = useCallback((id) => {
    // setTodos(todos => todos.map(item=>{
    //   return item.id===id
    //   ?{
    //     ...item,
    //     complete: !item.complete
    //   }:item
    // }))
    dispatch({type:'toggle',payload:id})
  },[])
  */

  //使用dispatch
  const dispatch = useCallback((action) => {
    // const { type,payload } = action
    // switch(type) {
    //   case 'set':
    //     setTodos(payload)
    //     break;
    //   case 'add':
    //     setTodos(todos => [...todos, payload])
    //     break;
    //   case 'remove':
    //     setTodos(todos => todos.filter(todo => {
    //       return todo.id !== payload
    //     }))
    //     break;
    //   case 'toggle':
    //     setTodos(todos => todos.map(item=>{
    //       return item.id===payload
    //       ?{
    //         ...item,
    //         complete: !item.complete
    //       }:item
    //     }))
    //     break;
    //   default:
    // }
    const state = {
      todos,
      incrementCount
    }

    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    }

    const newState = reducer(state,action)

    for(let key in newState) {
      setters[key](newState[key])
    }
    
  },[todos,incrementCount])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY)||'[]')
    // setTodos(todos)
    // dispatch({type:'set',payload: todos})
    dispatch(createSet(todos))
  }, [])

  useEffect(() => {
    localStorage.setItem(LS_KEY,JSON.stringify(todos))
  }, [todos])

  return (
    <div className="todo-list">
      <Control 
      {
        ...bindActionCreators({
          addTodo: createAdd
        },dispatch)
      }/>
      <Todos
        {...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        })}
        todos={todos}
      />
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
