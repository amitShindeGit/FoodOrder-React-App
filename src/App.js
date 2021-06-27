import {useState} from 'react';
import Header from './componenets/Layout/Header'
import Meals from  './componenets/Meals/Meals'
import Cart from './componenets/Cart/Cart'
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      
      <Header onShowCart={showCartHandler} />

      <main>
         <Meals />
      </main>

    </CartProvider>
  );
}

export default App;
