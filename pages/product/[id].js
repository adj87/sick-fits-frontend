import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage(props) {
  return <SingleProduct id={props?.query?.id}></SingleProduct>;
}
