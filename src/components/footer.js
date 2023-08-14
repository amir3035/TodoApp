import React from 'react'

export default function footer() {
    let style={
        position:"absolute",
        //bottom:"10vh",
        width: "100%",
        height:"100px"
    }
  return (
    <div>
      <>
      <div className="bg-dark text-light py-5 " style={style}>
          <p className='text-center'>
                Copyright &copy; mytodosapp.com
            </p>
      </div>
    </>
    </div>
  )
}
