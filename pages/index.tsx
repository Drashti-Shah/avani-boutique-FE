import type { NextPage } from 'next';

import Home from '@/modules/home/components/Home';
import { GET_SLIDER } from '@/common/graphql/query/GET_SLIDER';
import { client } from '@/common/graphql/client';
import { getBase64ImageUrl } from '@/common/lib/getBlurUrl';

const HomePage: NextPage = ({product, blurDataUrls}: {product: any; blurDataUrls: any;}) => {
  return <Home product={product} blurDataUrls={blurDataUrls} />;
};

  export default HomePage;
export async function getStaticProps() {
  const {
    data: {sliders},
  } = await client.query<{ sliderImage: { data: [] } }>({
    query: GET_SLIDER,
    variables: {
      sliderName: "homePageSlider",
    },
  });

  const blurDataUrls: { [key: string]: string } = {};

  if (sliders.data[0])
    await Promise.all(
      sliders.data[0].attributes.sliderImage.data.map(async (image: any) => {
        const dataUrl = await getBase64ImageUrl(image.attributes.hash, true);

        blurDataUrls[image.attributes.hash] = dataUrl;
      })
    );

  return {
    props: {
      product: sliders.data[0].attributes.sliderImage || null,
      blurDataUrls,
    },
  };
}
