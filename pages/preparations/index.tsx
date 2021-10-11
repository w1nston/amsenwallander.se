import Box from '@mui/material/Box';
import { getPreparations } from '../../features/preparations/list/queries/allPreparations';
import { IPreparation } from '../../features/preparations/types';
import PreparationLink from '../../features/preparations/list/components/PreparationLink';

type PreparationsProps = {
  preparations: IPreparation[];
};

function Preparations({ preparations }: PreparationsProps) {
  return preparations.map((preparation) => (
    <Box key={preparation.id} sx={{ margin: '1rem 0' }}>
      <PreparationLink
        key={preparation.id}
        title={preparation.title}
        slug={preparation.slug}
      />
    </Box>
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
