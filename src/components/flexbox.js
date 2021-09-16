import * as React from 'react';

const FlexBox = ({direction, justify, align, children}) => {
    let classes = `d-flex w-100`
    classes += direction ? ` flex-column` : ''
    if (justify){
        if (justify === 'end') 
            classes += ` justify-content-end`
        else if (justify === 'center')
            classes += ` justify-content-center`
        else if (justify === 'between')
            classes += ` justify-content-between`
        else if (justify === 'around')
            classes += ` justify-content-around`
    }
    console.log(classes)
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default FlexBox
