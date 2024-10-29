import { fetchProductRating } from '@/utils/actions';
import { FaStar } from 'react-icons/fa';

async function ProductRating({ productId }: { productId: string }) {
  const { count, rating } = await fetchProductRating(productId);

  const className = 'flex gap-1 items-center font-medium mt-1 mb-4';

  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating} ({count}) reviews
    </span>
  );
}

export default ProductRating;