import { createContext, useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},      
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
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

const removeCartItem = (cartItems, cartItemToRemove) => {
                                // find cartItem to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );                                 
                                // check if quantity is - if it is remove item from cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);   // if this statement is true keep value, else
    }                                
                                // else return back cartItems with matching cart item with reduced quantity(number) 3 > 2
    return cartItems.map((cartItem)=>
        cartItem.id === cartItemToRemove.id                     
        ? {...cartItem, quantity: cartItem.quantity - 1}    // give me new object with same props except quantity: give me quantity reduced by 1        
        : cartItem
    );
}
                                // if the cartItemToClear is equal to cartItem (item which is already there) filter it out completly  
const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload, 
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandled type of ${type} is cartReducer`);
    }
}

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);
    
    // useEffect(()=>{  // count
    //             // accumulator startValue = 0 in every pass it sum previous total number of items in cart and that new update
    //     const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);   
    //     setCartCount(newCartCount);
    // }, [cartItems])

    // useEffect(()=>{    // total
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem)=> total + cartItem.quantity * cartItem.price, 0)   
    //     setCartTotal(newCartTotal);
    // }, [cartItems])

    const [{ cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem)=> total + cartItem.quantity, 0
        );
        const newCartTotal = newCartItems.reduce(
            (total, cartItem)=> total + cartItem.quantity * cartItem.price, 0
        );
        
        dispatch( 
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount
            })
        );
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);    
    }

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
        );
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemToCart,
        clearItemFromCart, 
        cartItems, 
        cartCount,
        cartTotal
    };  

    return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}