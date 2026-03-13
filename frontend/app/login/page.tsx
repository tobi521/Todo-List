export default function Login() {
  return (
    <section className="text-gray-600 body-font w-full bg-gray-100 h-screen">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-center text-8xl flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
          <div>To-Do App</div>
        </h1>
        <div className="text-center mt-8 text-4xl mb-20">Log In</div>
        <div className="flex flex-col text-center mb-20 mt-10 justify-self-center">
          <input className="w-100 bg-white rounded border 
            border-gray-300 focus:border-green-800
            focus:ring-2 focus:ring-green-200 text-base 
            outline-none text-gray-700 py-3 px-3
            leading-8 transition-colors duration-200 ease-in-out mr-2 my-2" type="email" placeholder="Email"
          />
          <input className="w-100 bg-white rounded border 
            border-gray-300 focus:border-green-800
            focus:ring-2 focus:ring-green-200 text-base 
            outline-none text-gray-700 py-3 px-3
            leading-8 transition-colors duration-200 ease-in-out mr-2 my-2" type="password" placeholder="Password"
          />
          <button className="bg-gray-500 rounded hover:bg-gray-600 text-white py-3 px-4 focus:ring-2 focus:ring-gray-200 mt-4">Log In</button>
        </div>
      </div>
    </section>
  )
}