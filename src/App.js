import { useState } from "react";
import Meals from "./Components/Meals/Meals";
import Header from "./Components/Leyout/Header";
import Cart from './Components/Leyout/Cart'
import CartProvider from "./Components/Store/CartProvider-again";

function App() {

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandeler = () => {
    setCartIsShown(true);
  };

  const hideCartHandeler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      { cartIsShown && <Cart onClose={hideCartHandeler}/>}
      <Header onShowCart={showCartHandeler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
