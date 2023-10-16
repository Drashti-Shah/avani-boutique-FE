
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { useModal } from '@/common/recoil/modal';
import type { ProductDetailsPageProps } from '@/pages/[slug]';
import ProductGallery from './ProductGallery';
import ProductVariant from './ProductVariant';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ShippingAndReturnsModal from '../modals/ShippingAndReturnsModal';

const defaultSizes = [42, 42.5, 43, 43.5, 44];

const ProductDetails = ({ product, blurDataUrls }: ProductDetailsPageProps) => {
  const { slug } = useRouter().query;
  const { openModal } = useModal();

  const {
    id,
    attributes: {
      name,
      description,
      images,
      price,
      productVariants,
      category,
      productDetails,
      promotionPrice,
    },
  } = product;

  if (!slug) return null;

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-0 sm:px-5 md:px-10 lg:px-36 xl:flex-row xl:items-start xl:gap-12 xl:px-0 2xl:gap-24">
      <motion.div
        layoutId={id}
        className="relative flex h-full justify-end overflow-hidden xl:w-[50%] 2xl:min-w-[50%]"
      >
        <ProductGallery images={images.data} blurDataUrls={blurDataUrls} />
      </motion.div>

      <div className="mt-5 flex flex-1 justify-between px-2">
        <div>
          <h2 className="mb-2 text-4xl font-semibold leading-none 2xl:text-5xl">
            {name}
          </h2>

          <h3 className="mb-2 text-lg font-semibold leading-none text-zinc-600 2xl:text-2xl">
            {category[0].toUpperCase() + category.slice(1)}
          </h3>


          <h3 className="mt-10 text-3xl 2xl:text-4xl">₹{promotionPrice ? promotionPrice :price}</h3>

          <div className="mt-7 flex flex-wrap gap-2">
            {productVariants.data &&
              productVariants.data.attributes.products.data.map(
                (relatedProduct) => {
                  return (
                    <ProductVariant
                      selected={relatedProduct.id === id}
                      key={relatedProduct.id}
                      image={relatedProduct.attributes.images.data[0]}
                      slug={relatedProduct.attributes.slug}
                    />
                  );
                }
              )}
            {!productVariants.data && (
              <ProductVariant
                selected
                image={images.data[0]}
                slug={slug.toString()}
              />
            )}
          </div>

          <p className="mt-7 2xl:w-2/3">
            {description.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>
          <h2 className=" mb-1 text-xl font-semibold text-zinc-700 underline underline-offset-2	">
            Product details
          </h2>
          <Markdown children={String(productDetails)} remarkPlugins={[remarkGfm]} ></Markdown>

          <button
            className="btn mt-7 text-xl"
            onClick={() => {
              const phoneNumber = '9099446467'; // Replace with the recipient's phone number
              const message = 'Hello'; // Replace with your desired message
              const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
                message
              )}`;

              window.open(whatsappUrl, '_blank');
            }}
          >
            Buy Now
          </button>

          <div className="my-5 h-px w-full bg-zinc-300"></div>

          <button
            className="block cursor-pointer text-xs text-zinc-500 underline"
            onClick={() =>
              openModal(<ShippingAndReturnsModal />)
            }
          >
            Shipping & Returns
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
