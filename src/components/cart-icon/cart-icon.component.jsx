import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { 
    CartIconContainer,
    ShoppingIcon,
    ItemCount,
} from './cart-icon.styles';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);    // passing CartContext elements to CartIconComponent to use it
    
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;