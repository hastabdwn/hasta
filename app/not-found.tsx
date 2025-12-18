import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-start justify-center min-h-dvh bg-blue-600 text-white px-8'>
      <div className='space-y-4'>
        <h1 className='text-9xl text-left'>:(</h1>
        <p className='text-left'>404 Not Found</p>
        <p className='text-left'>The page you are looking for does not exist. Please check the URL and try again.</p>
        <Link href='/' className='bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded'>
          Go back to Home
        </Link>
      </div>
    </div>
  )
}