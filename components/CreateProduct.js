import React from 'react';
import useForm from '../lib/useForm';
import Form from '../components/styles/Form';

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice shoes',
    image: '',
    description: '',
    price: 3456,
  });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('achieved', inputs);
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Name
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
        <button onClick={clearForm}>Add Product</button>
      </fieldset>
    </Form>
  );
}

export default CreateProduct;
