import { Fragment, useContext } from "react";   // koristi se u slucaju da ne zelis nesto da bude renderovano na stranici 
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.scss';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

const Navigation = () =>{
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <div className="navigation"> 
        <Link className="logo-container" to='/'> 
            <CrwnLogo className="logo"/> 
        </Link>
        
        <div className="nav-links-container">
            <Link className="nav-link" to='/shop'>SHOP</Link>
            {
              currentUser ? (
                <span className="nav-link" onClick={signOutUser}>
                  {' '}
                  SIGN OUT{' '}
                </span>
              ):(
                <Link className="nav-link" to='/auth'>SIGN IN</Link>
              )
            }
            <CartIcon />
        </div>
        { isCartOpen && <CartDropdown /> } {/* if both side are truth then && return last thing what is sended (CartDropdown), othervise if isCartOpen is false it will just exit  */}
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;