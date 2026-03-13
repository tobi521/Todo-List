type Props = {}

export default function Siderbar({}: Props) {
  return (
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
  )
}