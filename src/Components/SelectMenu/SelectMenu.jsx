const SelectMenu = ( { options, onChange } ) => {
  return (
    <select className="border h-8 w-60" onChange={onChange}>
      {options.map((element, index) => index < 151 && <option value={index+1}>{element.toUpperCase()}</option>)}
    </select>
  )
}

export default SelectMenu;