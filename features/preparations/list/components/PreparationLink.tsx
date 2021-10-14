import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '../../../../lib/material-ui/adapters/Link';

type PreparationProps = {
  title: string;
  slug: string;
};

function PreparationLink({ title, slug }: PreparationProps) {
  return (
    <Link href={`/preparations/${encodeURIComponent(slug)}`}>
      <Paper sx={{ padding: '1rem' }}>
        <Typography variant="h4">{title}</Typography>
      </Paper>
    </Link>
  );
}

export default PreparationLink;
