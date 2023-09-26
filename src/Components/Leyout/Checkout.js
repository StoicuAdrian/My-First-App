import { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const isEmpty = value => value === '';

const Checkout = (props) => {

    const [formInputValidity, setFormInputValidity] =useState({
        name:true,
        street:true,
        city: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandeler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city:enteredCityIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid;
        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
        });

    };

    const nameControlClasses =`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const streetControlClasses =`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const cityControlClasses =`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;

    return(
        <form classes={classes.form} onSubmit={confirmHandeler}> 
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputValidity.name && <p>Please enter a valide name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>Please enter a valide street!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city'  ref={cityInputRef}/>
                {!formInputValidity.city && <p>Please enter a valide city!</p>}
            </div>
            <div>
                <div className={classes.actions}>
                    <button  type="button" onClick={props.onCancel}>Cancel</button>
                    <button className={classes.submit}>Submit</button>
                </div>
            </div>
        </form>
    )
}

export default Checkout;