/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { id } = router.query;

  return (

    <div className='h-screen w-screen bg-[#c2c2c2]'>
      <div className='flex justify-center flex-col items-center h-full m-2'>
        <div className="card w-full md:w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between w-full">
              <h2 className="card-title">Todo</h2>
              <div className="flex justify-end w-full">
                {
                  id ? (
                    <a href="/" className='btn btn-warning btn-sm m-2'>Cancel</a>
                  ) : (<a href="/new" className='btn btn-primary btn-sm m-2'>Add</a>)
                }
              </div>
            </div>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyApp
