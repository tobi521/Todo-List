'use client'

import { useState } from 'react'

export default function AddModal({open, setOpen}: any) {
  
	const [todo, setTodo] = useState({ title: "", desc: "", user: "" })

	const addTodo = () => {
		let todos = localStorage.getItem("todos")
		if (todos) {
			let todosJson = JSON.parse(todos)
			if (todosJson.filter(
				(value: any) => {
					return value.title == todo.title
				}
			).length > 0) {
				alert("Todo with this title already exists")
			}
			else {
				todosJson.push(todo)
				localStorage
					.setItem("todos", JSON.stringify(todosJson))
				alert("Todo has been added")
				setTodo({title: "", desc: "", user: ""})
			}
		}
		else {
			localStorage.setItem("todos", JSON.stringify([todo]))
		}
	}

	const onChange = (e:any) => {

		setTodo(
			{
				...todo,
				[e.target.name]: e.target.value
			}
		)
		console.log(todo)
	}

  return ( open ?
    <div className='fixed w-full h-full z-30 left-0'>
      <div className='absolute w-full h-full bg-gray-900 opacity-50 z-0'>
      </div>
      <div className=" text-3xl z-10 absolute w-full">
        <section className="text-gray-600 body-fontz-10 z-10 ">
          <div className="container px-5 py-24 
            mx-auto flex flex-wrap items-center">
            <div className="rounded-lg p-8 flex flex-col 
              md:ml-auto w-full mt-10 md:mt-0 bg-slate-100 ">
              <h2 className="text-gray-900 text-lg 
                font-medium title-font mb-5">
                Add a Todo
              </h2>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Todo Title
                </label>
                <input onChange={onChange} value={todo.title}
                  type="text" id="title" name="title"
                  className="w-full bg-white rounded border border-gray-300
                  focus:border-green-800 focus:ring-2 
                  focus:ring-green-200 text-base outline-none
                  text-gray-700 py-1 px-3
                  leading-8 transition-colors duration-200 ease-in-out"
                  autoComplete='false' />
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Todo Description</label>
                <input onChange={onChange} value={todo.desc}
                  type="text" id="desc" name="desc"
                  className="w-full bg-white rounded border 
                  border-gray-300 focus:border-green-800
                focus:ring-2 focus:ring-green-200 text-base 
                outline-none text-gray-700 py-1 px-3
                leading-8 transition-colors duration-200 ease-in-out" autoComplete='false' />
              </div>
              <button onClick={addTodo} className="text-white 
              bg-green-800 border-0 py-2 px-8
              focus:outline-none w-fit hover:bg-green-600
              rounded text-lg">Add Todo</button>

            </div>
          </div>
        </section>
      </div>
    </div> : <></> 
  )
}