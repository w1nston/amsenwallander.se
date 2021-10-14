import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '../../../../lib/material-ui/adapters/Link';

type RecipeProps = {
  title: string;
  slug: string;
  tags: string[];
};

function RecipeLink({ title, slug, tags }: RecipeProps) {
  return (
    <Link href={`/recipes/${encodeURIComponent(slug)}`}>
      <Paper sx={{ padding: '1rem' }}>
        <Typography variant="h4" sx={{ wordBreak: 'break-word' }}>
          {title}
        </Typography>
        <Typography variant="caption">{tags.join(', ')}</Typography>
      </Paper>
    </Link>
  );
}

export default RecipeLink;
