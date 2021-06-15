import React from 'react';
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent = ({error,loading,data, multidata}) => {
    
    return (
        <div>
            {error && alert("Please enter a valid city.")}
        
            {loading && 
            <Dimmer>
                <Loader>Loading..</Loader>
            </Dimmer>}
        </div>
    )
}

export default LoadingComponent
