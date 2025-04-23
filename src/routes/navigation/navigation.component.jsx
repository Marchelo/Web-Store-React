import { Fragment, useContext } from "react";   // koristi se u slucaju da ne zelis nesto da bude renderovano na stranici 
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { 
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink
 } from "./navigation.styles";

const Navigation = () =>{
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment> 
      <NavigationContainer> 
        <LogoContainer to='/'> 
            <CrwnLogo className="logo"/> 
        </LogoContainer>
        
        <NavLinks>
            <NavLink to='/shop'>SHOP</NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>
                  {' '}
                  SIGN OUT
                  {' '}
                </NavLink>
              ):(
                <NavLink to='/auth'>
                  SIGN IN
                </NavLink>
              )
            }
            <CartIcon />
        </NavLinks>
        { isCartOpen && <CartDropdown /> } {/* if both side are truth then && return last thing what is sended (CartDropdown), othervise if isCartOpen is false it will just exit  */}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;