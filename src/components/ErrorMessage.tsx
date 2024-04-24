type ErrorMessageProps = {
  children: React.ReactNode
}

const ErrorMessage = ({children} : ErrorMessageProps) => {
  return (
    <div className="p-2 bg-red-600 text-white font-thin rounded-md">
      <p>{children}</p>
    </div>
  )
}

export default ErrorMessage
