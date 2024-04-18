type LoadingProps = {
  message: string
}

const Loading = ({message} : LoadingProps) => {
  return (
    <div className="block text-center text-xl text-indigo-700 font-bold py-10">
      <p>Loading {message}...</p>
    </div>
  )
}

export default Loading
