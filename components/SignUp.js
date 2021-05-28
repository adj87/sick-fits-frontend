import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import ErrorMessage from '../components/ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    //  refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup().catch(console.error);
    console.log(error);
  };

  /*   const error =
    data?.authenticateUserWithPassword?.__typename ==
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined; */

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for an account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        {data?.createUser && (
          <>
            <p>
              Signed up with {data.createUser.email} - Please Go ahead and sign
              in
            </p>
          </>
        )}
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
            placeholder="Your password here"
          />
          <button type="submit">Add</button>
        </label>
      </fieldset>
    </Form>
  );
}
