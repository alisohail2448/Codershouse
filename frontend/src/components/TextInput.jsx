import React from 'react'

const TextInput = (props) => {
  return (
    <div>
        <input className='textInput' type="text" style={{ width: props.fullWidth === "true" ? '100%' : 'inherit'}} {...props} />
    </div>
  )
}

export default TextInput