import React from 'react';
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent = ({error,loading}) => {
    
    return (
        <div>
           
        
            
            { loading &&<Dimmer>
                <Loader>Loading..</Loader>
            </Dimmer>}
        </div>
    )
}

export default LoadingComponent
