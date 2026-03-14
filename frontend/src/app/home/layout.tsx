import Link from 'next/link'

export default function layout({ children }: any) {
  return (
    <div>
      <header className="text-gray-600 body-font bg-linear-to-r/srgb from-indigo-500 to-teal-400">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <h1 className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 text-justify-bottom">
            <Link href={"/home"}>
              <span className="ml-3 text-3xl text-green-500">To-do </span>  
              <span className='text-black text-xl'>App</span>
            </Link>
          </h1>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full hover:cursor-pointer p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
              </svg>
              <span className="text-white text-md ml-1 pr-1">Logout</span>
            </button>
          </nav>
        </div>
        <hr className="border-t-2 border-gray-200" />
      </header>
      <div className="flex">
        <div className="w-64 bg-gray-800 text-white p-4 h-screen">
          <div>
            <h1 className="text-4xl font-bold text-center mt-8 mb-20">Filter</h1>
            <div className='flex flex-col'>
              <div className="my-2 text-lg">user</div>
              <button className='text-lg font-semibold mb-4 border-2 border-white p-2 rounded-4xl hover:text-gray-500 hover:cursor-pointer'>All Todo</button>
              <button className='text-lg font-semibold mb-4 border-2 border-white p-2 rounded-4xl hover:text-gray-500 hover:cursor-pointer'>My Todo</button>
              <div className="my-2 text-lg">progress</div>
              <button className='text-lg font-semibold mb-4 border-2 border-white p-2 rounded-4xl hover:text-gray-500 hover:cursor-pointer'>Planned</button>
              <button className='text-lg font-semibold mb-4 border-2 border-white p-2 rounded-4xl hover:text-gray-500 hover:cursor-pointer'>Doing</button>
              <button className='text-lg font-semibold mb-4 border-2 border-white p-2 rounded-4xl hover:text-gray-500 hover:cursor-pointer'>Done</button>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className='bottom-0 left-0 right-0 bg-cyan-500 text-white text-center py-4'>
        <div>
          Create By Tobi @ 2026
        </div>
      </div>
    </div>
  )
}