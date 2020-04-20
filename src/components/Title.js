import React from 'react'

export default function Title({name, title}) {
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center">
                <h1 className="text-capitalize">
                    {name} {title}
                </h1>
            </div>
            
        </div>
    )
}
