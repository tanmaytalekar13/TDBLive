import notFound from '/404.gif'

const NotFound = () => {
  return (
    <div className='w-screen h-screen flex  justify-center'>
    <img src={notFound} className='h-[100%] object-cover w-[100%]' />
    </div>
  )
}

export default NotFound