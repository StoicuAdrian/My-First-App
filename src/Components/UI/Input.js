import { useRef } from 'react';
import React from 'react'
import classes from './Input.module.css'


const Input = React.forwardRef((props, ref) => {
    return (<div className={classes.input}>
    <label htmlfor={props.input.id}>{props.label}</label>
    <input ref={ref} id={props.input.id} {...props.input}/>
    </div>
   );
});


export default Input