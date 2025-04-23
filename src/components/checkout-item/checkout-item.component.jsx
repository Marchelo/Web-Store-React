import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import { 
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Quantity,
    Arrow,
    Value,
    Price,
    RemoveButton
} from './checkout-item.styles';
const CheckoutItem = ({cartItem})=> {
    const {name, imageUrl, price, quantity} = cartItem;

    const {clearItemFromCart, addItemToCart, removeItemToCart} = useContext(CartContext);
            // 2 reasons why you do this with handlers not straight with methods
        // 1. CLEARER CODE: if you ever change clear/add/remove methods you have clear view where definitions are
        // 2. OPTIMIZATION OF CODE
    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);
    
    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />                
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                    <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;