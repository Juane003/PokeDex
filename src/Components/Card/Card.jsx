const Card = ( {src, name, className, text} ) => {
  return (
    <div className={className}>
      <img className="rounded-full mt-8 h-32 border border-black bg-neutral-200 opacity:25%" src={src}/>
      <h1 className="pt-4 font-bold text-lg">{name}</h1>
      <p className="text-xs p-4 flex flex-row" >{text}</p>
    </div>
  )
}

export default Card;