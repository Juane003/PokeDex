const Button = ({ text, onClick, disabled}) => {
  return (
    <button className="flex flex-col rounded-md bg-violet-500 w-28 m-1 disabled:opacity-80 p-2" onClick={onClick} disabled={disabled}>{text}</button>
  )
}

export default Button;