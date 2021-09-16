import * as React from 'react'
import { formControl } from '../pages/styles.module.css'

const InputBox = ({type, name, id, placeholder})=> {
  type = type ? type : 'text'
  placeholder = placeholder ? placeholder : ''
  
  return (
      <input type={type} className={`form-control ${formControl}`} placeholder={placeholder}/>
  )
}

export default InputBox
