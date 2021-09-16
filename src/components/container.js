import * as React from 'react';

const ContainerBox = ({children})=>{
  return (
    <div className={`container mt-2`}>
      {children}
    </div>
  )
}

export default ContainerBox
