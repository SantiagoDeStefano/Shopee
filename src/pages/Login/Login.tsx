import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className='bg-[#ee4d2d]'>
      <div className='max-w-7xl mx-auto px-5'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Log In</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow'
                  placeholder='Phone number'
                />
                <div className="mt-1 text-red-600 min-h-[1rem] text-sm"></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm placeholder:text-sm focus:shadow'
                  placeholder='Password'
                />
                <div className="mt-1 text-red-600 min-h-[1rem] text-sm"></div>
              </div>
              <div className="mt-3">
                <button className="w-full rounded text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600">Log In</button>
              </div>
                <div className="flex items-center justify-center mt-8">
                  <span className="text-slate-400">New to Shopee?</span>
                  <Link to="/register" className="text-[#ee4d2d] ml-1 font-bold">Sign Up</Link>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
