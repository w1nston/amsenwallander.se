import { getPreparations } from '../../features/preparations/list/queries/allPreparations';
import { IPreparation } from '../../features/preparations/types';
import PreparationLink from '../../features/preparations/list/components/PreparationLink';

type PreparationsProps = {
  preparations: IPreparation[];
};

function Preparations({ preparations }: PreparationsProps) {
  return preparations.map((preparation) => (
    <PreparationLink
      key={preparation.id}
      title={preparation.title}
      slug={preparation.slug}
    />
  ));
}

export async function getStaticProps() {
  const preparations = await getPreparations();

  return {
    props: {
      preparations,
    },
    revalidate: 60, // TODO: figure out a sane default
  };
}

export default Preparations;
