import ProductsContainer from '@/components/products/ProductsContainer';

function ProductsPage({
  searchParams
}: {
  searchParams: { layout?: string; search?: string }
}) {
  const {
    layout = 'grid',
    search = '',
  } = searchParams;

  return (
    <ProductsContainer layout={layout} search={search} />
  );
}

export default ProductsPage;