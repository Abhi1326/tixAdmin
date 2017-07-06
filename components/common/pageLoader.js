import React from 'react'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
const progressId = 'queryContentProgress'

const LoaderComponent = (props) => {

    return (
        <div>
            <CircularProgress key="progress" id={progressId} centered={true} style={{marginTop: '300px'}}/>
            <div>{props.children}</div>

        </div>
    )

}
export default LoaderComponent