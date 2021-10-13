import Box from '@mui/material/Box';
import { getPreparations } from '../../features/preparations/list/queries/allPreparations';
import PreparationLink from '../../features/preparations/list/components/PreparationLink';
import { IPreparation } from '../../@types/index';

type PreparationsProps = {
  preparations: IPreparation[];
};

const TEN_MINUTES = 60 * 10;

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
    revalidate: TEN_MINUTES,
  };
}

export default Preparations;
