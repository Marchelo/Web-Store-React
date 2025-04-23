import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { 
    CartDropdownContainer,
    EmptyMessage,
    CartItems,
} from './cart-dropdown.styles';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);  
    
    const navigate = useNavigate();
    const goToCheckOutHandler = () =>{
        navigate('/checkout');
    }
    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length 
                        ? cartItems.map((item) => (
                            <CartItem key={item.id} cartItem={item}/>
                        ))
                        : (
                            <EmptyMessage>Your cart is empty</EmptyMessage>
                        ) 
                }
            </CartItems>
            <Button onClick={goToCheckOutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;