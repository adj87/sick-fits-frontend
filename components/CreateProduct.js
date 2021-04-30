import React from 'react';
import useForm from '../lib/useForm';

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice shoes',
  });
  return (
    <form>
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
      <button type="button" onClick={clearForm}>
        clearForm
      </button>
    </form>
  );
}

export default CreateProduct;
