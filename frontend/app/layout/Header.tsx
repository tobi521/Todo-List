'use client'

import Link from 'next/link'

const Header = () => {
	return (
		<header className="text-gray-600 body-font bg-linear-to-r/srgb from-indigo-500 to-teal-400">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<h1 className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 text-justify-bottom">
					<Link href={"/home"}>
						<span className="ml-3 text-2xl text-green-500">To-do </span>  
						<span className='text-black'>App</span>
					</Link>
				</h1>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					<button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full  mr-4 hover:cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
							<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
						</svg>
					</button>
				</nav>
			</div>
			<hr className="border-t-2 border-gray-200" />
		</header>
	)
}

export default Header
