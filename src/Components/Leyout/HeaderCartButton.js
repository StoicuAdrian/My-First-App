import { useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context-again";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const [btnBump, setBtnBump] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx

    const numberOfCartItems = items.reduce((curentNumber, item) => {
        return curentNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnBump ? classes.bump: ''}`;
    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnBump(true);


        const timer = setTimeout(() => {
            setBtnBump(false);
        }, 300);
        return()=> {
            clearTimeout(timer);
        };
    }, [items])

    return( 
            <button className={btnClasses} onClick={props.onClick}>
                    <span className={classes.icon}>
                        <CartIcon />
                    </span>
                <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}; 

export default HeaderCartButton;

