'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createList } from '../redux/actions/listAction'

export default function AddModal({open, setOpen}: any) {  
	const [todo, setTodo] = useState({ title: "", description: "", user: "" })
  const auth = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if(auth.isAuthenticated) {
      setTodo({...todo, user: auth.user.id})
    }
  }, [auth.isAuthenticated])

	const addTodo = () => {
		createList(todo, dispatch)
    setOpen(false)
	}

	const handleChange = (e:any) => {
		setTodo({...todo, [e.target.name]: e.target.value})
		console.log(todo)
	}

  const handleClose = (e:any) => {
    setOpen(false)
  }

  return ( open ?
    <div className='fixed w-full h-full z-8 left-0 top-0'>
      <div className='fixed w-full h-full bg-gray-900 opacity-50 z-9' onClick={(e:any) => handleClose(e)}>
      </div>
      <div className=" text-3xl z-10 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-3/4">
        <section className="text-gray-600 body-font">
          <div className="container flex flex-wrap items-center">
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
                <input onChange={handleChange} value={todo.title}
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
                <input onChange={handleChange} value={todo.description}
                  type="text" id="description" name="description"
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