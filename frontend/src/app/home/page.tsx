'use client'
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProtectedRoute from "../../component/common/ProtectedRoute"

import { fetchLists, removeList, createList, modifyList, searchList } from "../../redux/actions/listAction"
import Input from "@/src/component/common/Input"
import Button from "@/src/component/common/Button"
import { logoutUser } from "@/src/redux/actions/authAction"

type Props = {}

export default function page({}: Props) {
	const [todo, setTodo] = useState({title: "", description: "", dueDate: new Date().toISOString().split('T')[0], user_id: "", option: "", id: "", status: false})
	const [mode, setMode] = useState("add");
	const [search, setSearch] = useState({key: "", value: ""});

	const dispatch = useDispatch()
	const list = useSelector((state:any) => state.list)
	const auth = useSelector((state: any) => state.auth)
	const error = useSelector((state: any) => state.error)

	useEffect(() => {
		setTodo({...todo, user_id: auth.user.id})
		if(auth.user.id)
			fetchLists(auth.user.id , dispatch)
	}, [auth.user])

	const initTodo = () => {
		setTodo({title: "", description: "", dueDate: new Date().toISOString().split('T')[0], user_id: auth.user.id, option: "personal", id: "", status: false})
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTodo({ ...todo, [e.target.name]: e.target.value })
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch({key: "title", value: e.target.value})
	}

	const handleStatusChange = (id: string, state: boolean) => {
		modifyList(id, {status: state}, dispatch)
	}

	const handleTodoClick = (item: any) => {
		setTodo({...todo, ...item, dueDate: item.dueDate.split("T")[0]});
		setMode("edit")
	}

	const handeAddClick = () => {
		setMode("add")
		initTodo()
	}

	const addTodo = () => {
		createList(todo, dispatch);
		initTodo()
	}

	const removeTodo = (id: any) => {
		removeList(id, dispatch)
		initTodo()
	};

	const searchTodo = (e:any) => {
		if(e.key === "Enter") {
			searchList(search, dispatch)
		}
	}

	const updateTodo = () => {
		modifyList(todo.id, todo, dispatch)
		initTodo()
		setMode("add")
	}

	return (
		<ProtectedRoute>
			<div className="bg-taupe-200 top-0 left-0 w-full h-screen flex items-center justify-center">
				<div className="flex flex-row justify-center m-18 rounded-xl h-200 shadow-lg w-5/6">
					<div className="basis-1/4 bg-gray-100 rounded-l-2xl">
						<div className="m-7 flex flex-col">
							<h2 className="text-3xl font-bold mb-5">
								<p>Menu</p>
							</h2>
							<div className="mb-10" onKeyDown={(e:any)=> searchTodo(e)}>
								<Input type="text" placeholder="Search" name="search" icon={
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
										<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
									</svg>
									}
									onChange={handleSearchChange}
									value={search.value}
								/>
							</div>
							<div className="flex flex-col w-full">
								<h3 className="text-lg mb-3">TASKS</h3>
								<div>
									<ul>
										<li className="flex p-2 hover:bg-gray-200 rounded cursor-pointer" onClick={() => searchList({key: "title", value: ""}, dispatch)}>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
											</svg>
											<p className="ml-2">All</p>
										</li>
										<li className="flex p-2 hover:bg-gray-200 rounded cursor-pointer" onClick={() => searchList({key: "status", value: false}, dispatch)}>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
											</svg>
											<p className="ml-2">Todo</p>
										</li>
										<li className="flex p-2 hover:bg-gray-200 rounded cursor-pointer" onClick={() => searchList({key: "status", value: true}, dispatch)}>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
											</svg>
											<p className="ml-2">Done</p>
										</li>
									</ul>
								</div>
								<h3 className="text-lg mb-3 mt-10">LISTS</h3>
								<div>
									<ul>
										<li className="flex p-2 items-center hover:bg-gray-200 rounded cursor-pointer"  onClick={() => searchList({key: "option", value: "personal"}, dispatch)}>
											<p className="bg-red-500 rounded-full w-4 h-4 mr-2"></p>
											<p className="ml-2">Personal</p>
										</li>
										<li className="flex p-2 items-center hover:bg-gray-200 rounded cursor-pointer" onClick={() => searchList({key: "option", value: "work"}, dispatch)}>
											<p className="bg-blue-500 rounded-full w-4 h-4 mr-2"></p>
											<p className="ml-2">Work</p>
										</li>
										<li className="flex p-2 items-center hover:bg-gray-200 rounded cursor-pointer" onClick={() => searchList({key: "option", value: "other"}, dispatch)}>
											<p className="bg-yellow-500 rounded-full w-4 h-4 mr-2"></p>
											<p className="ml-2">Other</p>
										</li>
									</ul>
								</div>
							</div>
							<div className="flex py-2 hover:bg-gray-200 rounded cursor-pointer px-1 mt-20" onClick={() => logoutUser(dispatch)}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
								</svg>
								<button className="pl-2 w-full text-left cursor-pointer" onClick={() => logoutUser(dispatch)}>
									Log Out
								</button>
							</div>
						</div>
					</div>
					<div className="basis-5/12 p-4 bg-white">
						<h3 className="text-5xl px-5 pt-2 font-bold mb-10">Todos</h3>
						<div className="m-4 pr-4">
							<button className="border-y mx-4 py-3 text-xl text-gray-400 flex border-gray-300 hover:bg-gray-200 cursor-pointer w-full" onClick={handeAddClick}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
								Add New Task
							</button>
						</div>
						<div className="flex flex-col m-4 pl-4">
							{list.lists.length > 0 ? list.lists.map((item: any) => 
								<div 
									key={item._id} 
									className={`text-2xl border-b border-gray-300 py-3 hover:bg-gray-100 cursor-pointer flex items-center ${item.status ? "line-through text-gray-400" : ""}`} 
								>
									<input type="checkbox" checked={item.status} onChange={(e) => handleStatusChange(item._id, e.target.checked)} className="mr-3 scale-130"/>
									<p className="ml-1" onClick={() => handleTodoClick({id: item._id, title: item.title, description: item.description, dueDate: item.dueDate, option: item.option, status: item.status})}>
										{item.title}
									</p>
								</div>) 
								: 
								<p>No todos for today.</p>
							}
						</div>
					</div>
					<div className="basis-1/3 bg-gray-50 p-4 rounded-r-2xl">
						<div className="m-2">
							<h3 className="text-3xl font-bold mb-5">Task:</h3>
							<div className="flex flex-col w-full">
								<Input title="Title" type="text" name="title" value={todo.title} onChange={handleChange} placeholder="Type your title" error={error.errors.title}/>
								<Input title="Description" type="text" name="description" value={todo.description} onChange={handleChange} placeholder="Type your description" error={error.errors.description}/>
							</div>
							<div>
								<div className="flex flex-row items-center m-2 my-5">
									<h5 className="text-lg basis-1/5">List</h5>
									<select name="option" className="ml-2 border rounded px-2 py-1 basis-1/4 border-none" value={todo.option} onChange={e => handleChange(e as any)}>
										<option value="personal">Personal</option>
										<option value="work">Work</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div className="flex flex-row items-center m-2 ">
									<h5 className="text-lg basis-1/5">Due Date</h5>
									<input type="date" className="ml-2 border rounded px-2 py-1 basis-1/4 border-none" name="dueDate" value={todo.dueDate} onChange={handleChange} />
								</div>
								<div className="flex flex-row m-2 my-5 ">
									{mode === "edit" && <Button className="rounded-lg border-1 border-gray-400 text-black basis-1/2 mx-5 hover:bg-red-400 hover:text-white" onClick={() => removeTodo(todo.id)}>
										Delete Task
									</Button>
									}
									<Button className="rounded-lg text-black basis-1/2 mx-5 bg-yellow-300 hover:bg-yellow-400" onClick={ mode === "add" ? addTodo : updateTodo}>
										{mode === "edit" && "Save Task" || mode === "add" && "Add Task"}
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</ProtectedRoute>
	);
}
