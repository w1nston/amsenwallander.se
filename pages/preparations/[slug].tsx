import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { getPreparations } from '../../features/preparations/list/queries/allPreparations';
import { getPreparation } from '../../features/preparations/preparation/queries/getPreparation';
import { IPreparation } from '../../features/preparations/types';

type PreparationProps = {
  preparation: IPreparation;
};

function Preparation({ preparation }: PreparationProps) {
  return (
    <section>
      <h1>{preparation.title}</h1>
      <article>{documentToReactComponents(preparation.content)}</article>
    </section>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): InferGetStaticPropsType<typeof getStaticProps> {
  const { params } = context;

  const preparation = await getPreparation(params.slug);

  return {
    props: {
      preparation,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const preparations = await getPreparations();

  const paths = preparations.map((preparation) => ({
    params: { slug: preparation.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default Preparation;
