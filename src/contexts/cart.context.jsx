import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},      
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0   

})

const addCartItem = (cartItems, productToAdd) => {
                                        // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    ); 
                                        // if found increment quantity      (if that product exists in cart then put one more)
    if(existingCartItem){   
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id                     
            ? {...cartItem, quantity: cartItem.quantity + 1}         
            : cartItem
        );
    }
                                        // return new array with modified cartItems / new cartItem
    return [...cartItems, { ...productToAdd, quantity: 1 }];    // new product
}

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    
    useEffect(()=>{  
                // accumulator startValue = 0 in every pass it sum previous total number of items in cart and that new update
        const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0)   
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};  

    return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}