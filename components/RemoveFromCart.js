import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &: hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation deleteCartItem($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
  });
  return (
    <BigButton onClick={removeFromCart} title="Remove this item from cart">
      &times;
    </BigButton>
  );
}
