import React from 'react'
import { HashLoader } from 'react-spinners'

const LoaderComponent = () => {
    return (
        <div className=" relative flex justify-center items-center top-20">
            <HashLoader color="#cb49d4" size={75} />
        </div>
    )
}

export default LoaderComponent
