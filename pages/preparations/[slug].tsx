import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { getPreparations } from '../../features/preparations/list/queries/allPreparations';
import { getPreparation } from '../../features/preparations/preparation/queries/getPreparation';
import Preparation from '../../features/preparations/preparation/components/Preparation';
import { IPreparation } from '../../@types/index';

type PreparationProps = {
  preparation: IPreparation;
};

const TEN_MINUTES = 60 * 10;

function PreparationPage({ preparation }: PreparationProps) {
  // @ts-ignore
  const content = documentToReactComponents(preparation.content);
  return <Preparation title={preparation.title}>{content}</Preparation>;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  // @ts-ignore
  const preparation = await getPreparation(params.slug);

  return {
    props: {
      preparation,
    },
    revalidate: TEN_MINUTES,
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
