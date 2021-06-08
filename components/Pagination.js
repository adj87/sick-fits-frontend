import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  const count = data?._allProductsMeta?.count;
  const pageCount = Math.ceil(count / perPage);
  if (loading) return 'loading...';
  if (error) return 'error';
  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick - fits {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`} aria-disabled={page === 1}>
        <a aria-disabled={page <= 1}>Prev </a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>Items total {count}</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next </a>
      </Link>
    </PaginationStyles>
  );
}
