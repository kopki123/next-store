import { z, ZodSchema } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'name must be at least 2 characters.' })
    .max(100, { message: 'name must be less than 100 characters.' }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  description: z.string().refine((description) => {
    const wordCount = description.split(' ').length;
    return wordCount >= 10 && wordCount <= 1000;
  }, {
    message: 'description must be between 10 and 1000 words.',
  }),
});

export const imageSchema = validateImageFile();

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== '', {
    message: 'Product ID cannot be empty',
  }),
  authorName: z.string().refine((value) => value !== '', {
    message: 'Author name cannot be empty',
  }),
  authorImageUrl: z.string().refine((value) => value !== '', {
    message: 'Author image URL cannot be empty',
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
  comment: z
    .string()
    .min(10, { message: 'Comment must be at least 10 characters long' })
    .max(1000, { message: 'Comment must be at most 1000 characters long' }),
});

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;

  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  return z.object({
    image: z
      .any()
      .refine((file) => file?.size <= maxUploadSize, 'File size must be less than 1MB') // this should be greater than or equals (>=) not less that or equals (<=)
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), '.jpg, .jpeg, .png and .webp files are accepted.'),
  });
}

export function validateWithZodSchema<T>(schemas: ZodSchema<T>, data: unknown): T {
  const validatedFields = schemas.safeParse(data);

  if (!validatedFields.success) {
    const errors = validatedFields.error.errors.map((error) => error.message);
    throw new Error(errors.join(','));
  }

  return validatedFields.data;
}