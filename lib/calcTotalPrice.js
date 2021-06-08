export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    console.log(cartItem);
    if (!cartItem.product) return tally;
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
