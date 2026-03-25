'use client'
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDebounce } from "use-debounce"

import ProtectedRoute from "../../component/common/ProtectedRoute"
import Input from "../../component/common/Input"
import Button from "../../component/common/Button"

import { 
	fetchLists, 
	removeList, 
	createList, 
	modifyList, 
	searchList, 
	removeMultipleLists, 
	modifyMultipleListsStatus 
} from "../../redux/actions/listAction"
import { logoutUser } from "../../redux/actions/authAction"

type Props = {}

export default function page({}: Props) {
	const [todo, 		setTodo] = useState<any>({
		title: "",
		description: "",
		dueDate: new Date().toISOString().split('T')[0],
		option: "personal",
		id: "",
		status: false
	})
	const [mode, setMode] = useState<string>("add");
	const [search, setSearch] = useState<{ key: string, value: string }>({ key: "", value: "" });
	const [categoryOne, setCategoryOne] = useState();
	const [categoryTwo, setCategoryTwo] = useState<string>("");
	const [sort, setSort] = useState<string>("title");
	const [multiSelect, setMultiSelect] = useState<Array<String>>([]);
	const [selectAll, setSelectAll] = useState<boolean>(false);

	const list = useSelector((state: any) => state.list)
	const error = useSelector((state: any) => state.error)

	const dispatch = useDispatch()

  const [debouncedSearch] = useDebounce(search, 1000);
	
	useEffect(() => {
		fetchLists(dispatch)
	}, [])

  useEffect(() => {
    if (debouncedSearch.key !== "") {
			searchList(search, dispatch)
			setCategoryOne(undefined);
			console.log(debouncedSearch)
    }
  }, [debouncedSearch])

	useEffect(() => {
		if(categoryOne === '') {
			setCategoryTwo("")
		}
	}, [categoryOne])

	useEffect(() => {
		if(selectAll) {
			setMultiSelect(
				list.lists
					.filter((item: any) => categoryTwo !== "" ? item.option === categoryTwo : true)
					.map((item: any) => item._id)
				)
		} else {
			setMultiSelect([])
		}
	}, [selectAll])

	const initTodo = () => {
		setTodo({
			title: "", 
			description: "", 
			dueDate: new Date().toISOString().split('T')[0], 
			option: "personal", 
			id: "", 
			status: false
		})
	}

	const handleChange = (e: any) => {
		setTodo({ ...todo, [e.target.name]: e.target.value })
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch({key: "title", value: e.target.value})
	}

	const handleStatusChange = (id: string, state: boolean) => {
		modifyList(id, {status: state}, dispatch)
	}

	const handleMultiSelectChange = (id: string) => {
		if(multiSelect.find(item => item === id)) {
			setMultiSelect(prev => prev.filter(item => item !== id))
		} else {
			setMultiSelect([...multiSelect, id])
		}
	}

	const handleTodoClick = (item: any) => {
		setTodo({...todo, ...item, dueDate: item.dueDate.split("T")[0]});
		setMode("edit")
	}

	const handeAddClick = () => {
		setMode("add")
		initTodo()
	}

	const changeCategoryOne = (category: string, value: any) => {
		setCategoryOne(value)
		searchList({key: category, value: value}, dispatch)
	}

	const changeCategoryTwo = (category: string, value: any) => {
		setCategoryTwo(value)
	}

	const addTodo = () => {
		createList(todo, dispatch);
		initTodo()
	}

	const removeTodo = (id: any) => {
		removeList(id, dispatch)
		initTodo()
	};

	const removeMultipleTodos = () => {
		removeMultipleLists(multiSelect, dispatch)
		setMultiSelect([])
		setSelectAll(false)
	};

	const updateMultipleTodoStatus = (status: boolean) => {
		modifyMultipleListsStatus(multiSelect, status, dispatch)
		setMultiSelect([])
		setSelectAll(false)
	}

	const updateTodo = () => {
		modifyList(todo.id, todo, dispatch)
		// initTodo()
		setMode("add")
	}

	return (
		<ProtectedRoute>
			<div className="bg-taupe-200 top-0 left-0 w-full h-screen flex items-center justify-center">
				<div className="flex flex-row justify-center m-18 rounded-xl h-200 shadow-lg w-5/6">
					<div className="basis-1/4 bg-gray-100 rounded-l-2xl">
						<div className="m-7 flex flex-col">
							<h2 className="text-2xl font-bold mb-5">
								<p>Menu</p>
							</h2>
							<div className="mb-10">
								<Input 
									type="text" 
									placeholder="Search" 
									name="search" 
									icon={
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
											<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
										</svg>
									}
									onChange={handleSearchChange}
									value={search.value}
								/>
							</div>
							<div className="flex flex-col w-full">
								<h3 className="mb-3">TASKS</h3>
								<div>
									<ul>
										<li 
											className={`flex p-2 hover:bg-gray-200 rounded cursor-pointer text-sm ${categoryOne === "" ? "bg-gray-200" : ""}`} 
											onClick={() => changeCategoryOne("title", "")} 
											id="all"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
											</svg>
											<p className="ml-2">All</p>
										</li>
										<li 
											className={`flex p-2 hover:bg-gray-200 rounded cursor-pointer text-sm ${categoryOne === false ? "bg-gray-200" : ""}`} 
											onClick={() => changeCategoryOne("status", false)} 
											id="todo"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
											</svg>
											<p className="ml-2">Todo</p>
										</li>
										<li 
											className={`flex p-2 hover:bg-gray-200 rounded cursor-pointer text-sm ${categoryOne === true ? "bg-gray-200" : ""}`} 
											onClick={() => changeCategoryOne("status", true)} 
											id="done"
										>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
												<path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
											</svg>
											<p className="ml-2">Done</p>
										</li>
									</ul>
								</div>
								<h3 className="text-md mb-3 mt-10">LISTS</h3>
								<div>
									<ul>
										<li 
											className={`flex p-2 items-center hover:bg-gray-200 rounded cursor-pointer text-sm ${categoryTwo === "personal" ? "bg-gray-200" : ""}`}  
											onClick={() => changeCategoryTwo("option", "personal")} 
											id="personal"
										>
											<p className="bg-red-500 rounded-full w-4 h-4 mr-2"></p>
											<p className="ml-2">Personal</p>
										</li>
										<li 
											className={`flex p-2 items-center hover:bg-gray-200 rounded cursor-pointer text-sm ${categoryTwo === "work" ? "bg-gray-200" : ""}`} 
											onClick={() => changeCategoryTwo("option", "work")} 
											id="work"
										>
											<p className="bg-blue-500 rounded-full w-4 h-4 mr-2"></p>
											<p className="ml-2">Work</p>
										</li>
										<li 
											className={`flex p-2 items-center hover:bg-gray-200 rounded cursor-pointer text-sm ${categoryTwo === "other" ? "bg-gray-200" : ""}`} 
											onClick={() => changeCategoryTwo("option", "other")} 
											id="other"
										>
											<p className="bg-yellow-500 rounded-full w-4 h-4 mr-2"></p>
											<p className="ml-2">Other</p>
										</li>
									</ul>
								</div>
							</div>
							<div 
								className="flex py-2 hover:bg-gray-200 rounded cursor-pointer px-1 mt-20" 
								onClick={() => logoutUser(dispatch)}
							>
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
						<h3 className="text-3xl px-5 pt-2 font-bold mb-10">Todos</h3>
						<div className="flex flex-row items-center m-2 justify-between">
							<div>
								{
									multiSelect.length > 0 &&
									(<>
										<button 
											className="border rounded py-1 px-3 hover:bg-gray-200 ml-8 cursor-pointer" 
											onClick={removeMultipleTodos}
										>
											Delete
										</button>
										<button 
											className="border rounded py-1 px-3 hover:bg-gray-200 ml-3 cursor-pointer" 
											onClick={() => updateMultipleTodoStatus(false)}
										>
											InCompleted
										</button>
										<button 
											className="border rounded py-1 px-3 hover:bg-gray-200 ml-3 cursor-pointer" 
											onClick={() => updateMultipleTodoStatus(true)}
										>
											Done
										</button>
									</>)
								}
							</div>
							<div className="flex flex-row items-center">
								<h5 className="text-sm">Sort By:</h5>
								<select 
									name="option" 
									className="border rounded py-1 basis-1/5 border-none" 
									value={sort} 
									onChange={e => setSort(e.target.value)}
								>
									<option value="title">Title</option>
									<option value="dueDate">DueDate</option>
									<option value="option">List</option>
								</select>
							</div>
						</div>
						<div className="m-4 pr-4 flex flex-row items-center justify-between">
							<input type="checkbox" className="mr-3 scale-130 ml-4" checked={selectAll} onChange={(e) => setSelectAll(e.target.checked)} />
							<button 
								className="border-y mx-4 py-3 text-gray-400 flex border-gray-300 hover:bg-gray-200 cursor-pointer w-full" 
								onClick={handeAddClick}
							>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>
								Add New Task
							</button>
						</div>
						<div className="flex flex-col m-4 pl-4 overflow-y-auto h-135">
							{list.lists.length > 0 ? 
								list.lists
								.filter((item: any) => categoryTwo !== "" ? item.option === categoryTwo : true)
								.sort((a: any, b: any) => a[sort] > b[sort] ? 1 : -1)
								.map((item: any) =>
								<div 
									key={item._id} 
									className={`text-2xl border-b border-gray-300 hover:bg-gray-100 cursor-pointer flex items-center ${item.status ? "line-through text-gray-400" : ""}`} 
								>
									<input 
										type="checkbox" 
										onChange={(e) => handleMultiSelectChange(item._id)} 
										className="mr-3 scale-130" 
										checked={multiSelect.includes(item._id)} 
									/>
									<div 
										className="flex flex-row items-center text-sm  py-2" 
										onClick={() => handleTodoClick({ 
											id: item._id, 
											title: item.title, 
											description: item.description, 
											dueDate: item.dueDate, 
											option: item.option, 
											status: item.status 
										})}
									>
										<p className="ml-1 w-100 overflow-hidden text-ellipsis">
											{item.title}
										</p>
										<p className="ml-2 text-sm text-gray-500 w-25">{ new Date(item.dueDate).toISOString().split('T')[0] }</p>
									</div>
									<span 
										className="text-sm text-gray-500 mr-3 hover:text-gray-400" 
										aria-checked={item.status} 
										onClick={() => handleStatusChange(item._id, !item.status)}
									>
										{item.status === true ? 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6 text-green-500">
											<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
										</svg>
										: 
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
										</svg>
										}
									</span>
								</div>) 
								: 
								<p>No todos for today.</p>
							}
						</div>
					</div>
					<div className="basis-1/3 bg-gray-50 p-4 rounded-r-2xl">
						<div className="m-2 overflow-y-auto h-full">
							<h3 className="text-2xl font-bold mb-5">Task:</h3>
							<div className="flex flex-col w-full">
								<Input 
									title="Title" 
									type="text" 
									name="title" 
									value={todo.title} 
									onChange={handleChange} 
									placeholder="Type your title" 
									error={error.errors.title}
								/>
								<Input 
									title="Description" 
									type="textarea" 
									name="description" 
									value={todo.description} 
									onChange={handleChange} 
									placeholder="Type your description" 
									error={error.errors.description}
								/>
							</div>
							<div>
								<div className="flex flex-row items-center m-2 my-5">
									<h5 className="text-md basis-1/5">List</h5>
									<select 
										name="option" 
										className="ml-2 border rounded px-2 py-1 basis-1/4 border-none text-sm" 
										value={todo.option} 
										onChange={e => handleChange(e)}
									>
										<option value="personal">Personal</option>
										<option value="work">Work</option>
										<option value="other">Other</option>
									</select>
								</div>
								<div className="flex flex-row items-center m-2 ">
									<h5 className="text-md basis-1/5">Due Date</h5>
									<input 
										type="date" 
										className="ml-2 border rounded px-2 py-1 basis-1/4 border-none text-sm" 
										name="dueDate" 
										value={todo.dueDate} 
										onChange={handleChange} 
									/>
								</div>
								<div className="flex flex-row m-2 my-5 ">
									{mode === "edit" && 
									<Button 
										className="rounded-lg border-1 border-gray-400 text-black basis-1/2 mx-3 hover:bg-red-400 hover:text-white text-sm" 
										onClick={() => removeTodo(todo.id)}
									>
										Delete Task
									</Button>
									}
									<Button 
										className="rounded-lg text-black basis-1/2 mx-3 bg-yellow-300 hover:bg-yellow-400 text-sm" 
										onClick={ mode === "add" ? addTodo : updateTodo}
									>
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
