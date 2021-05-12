import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Router } from 'next/router';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  // prettier-ignore
  const [updateProduct, { data: updateData, error: updateError, loading: updateLoading }] = useMutation(UPDATE_PRODUCT_MUTATION);
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  console.log('updateData', updateData);
  return (
    <Form
      onSubmit={async (e) => {
        console.log('data', data);
        console.log('inputs', inputs);
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id: inputs.id,
            data: {
              name: inputs.name,
              description: inputs.description,
              price: inputs.price,
            },
          },
        });
        console.log('la ressssssss', res);

        /*         const res = await createProduct(inputs);
        clearForm();
        Router.push({ pathname: `/product/${res.data.createProduct.id}` });
        // submit the inputFields to the backend */
      }}
    >
      <ErrorMessage error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="asdasd"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Price
          <input
            type="number"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Description
          <textarea
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button>Update Product</button>
      </fieldset>
    </Form>
  );
}
