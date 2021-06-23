import Link from 'next/link';
import { useCart } from '../lib/cartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import CartCount from './CartCount';

export default function Nav() {
  const user = useUser();
  const { setCartOpen } = useCart();
  console.log('the user ', user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={() => setCartOpen(true)}>
            {' '}
            My Cart
            <CartCount
              count={user.cart.reduce((acc, el) => (acc += el.quantity), 0)}
            />
          </button>
        </>
      )}
      {!user && <Link href="/signin">Sign in</Link>}
    </NavStyles>
  );
}
