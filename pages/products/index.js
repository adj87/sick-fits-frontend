import React from 'react';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/dist/client/router';

export default function ProductPage() {
  const { query } = useRouter();
  const page = parseInt(query.page) || 1;
  console.log('la page,', page);
  return (
    <div>
      <Pagination page={page || 1} />
      <Products page={page} />
      <Pagination page={page || 1} />
    </div>
  );
}
