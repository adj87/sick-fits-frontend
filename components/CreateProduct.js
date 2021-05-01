import React from 'react';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from '../components/styles/Form';
import ErrorMessage from '../components/ErrorMessage';
import gql from 'graphql-tag';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice shoes',
    image: '',
    description: '',
    price: 3456,
  });
  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  console.log('inputs', inputs);
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createProduct(inputs);
        clearForm();
        // submit the inputFields to the backend
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Imagen
          <input
            required
            type="file"
            name="image"
            placeholder="Upload an image"
            onChange={handleChange}
          />
        </label>
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
        <button>Add Product</button>
      </fieldset>
    </Form>
  );
}

export default CreateProduct;
