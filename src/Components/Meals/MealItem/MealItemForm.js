import { useRef , useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealsItemForm.module.css'

const MealItemForm = (props) => {
    
    
    const [amountIsValid, setAmountIsValid] = useState(true)
    
    
    const amountInputRef = useRef();
    
    
    const submitHandeler = event => {
        event.preventDefault();


        const enteredAmount = amountInputRef.current.value;  
        
        
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().lenght === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }
        
        props.onAddToCart(enteredAmountNumber);
    };


        return <form className={classes.form} onSubmit={submitHandeler}>
            <Input label="Amount"  
                ref={amountInputRef}
                input={{
                id: 'amount_' + props.id, 
                type:'number',
                min:'1',
                max:'5',
                steo:'1',
                default:'1',
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount.</p>}
        </form>

}

export default MealItemForm;