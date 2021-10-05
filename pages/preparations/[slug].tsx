import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { getPreparations } from '../../features/preparations/list/queries/allPreparations';
import { getPreparation } from '../../features/preparations/preparation/queries/getPreparation';
import { IPreparation } from '../../features/preparations/types';
import Preparation from '../../features/preparations/preparation/components/Preparation';

type PreparationProps = {
  preparation: IPreparation;
};

function PreparationPage({ preparation }: PreparationProps) {
  return (
    <Preparation title={preparation.title}>
      {documentToReactComponents(preparation.content)}
    </Preparation>
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

export default PreparationPage;
