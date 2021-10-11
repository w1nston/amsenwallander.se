import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

type RecipeProps = {
  title: string;
} & { children: ReactNode };

function Recipe({ children, title }: RecipeProps) {
  return (
    <Container>
      <Typography variant="h1" sx={{ fontSize: '2.5rem' }}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Container>
  );
}

export default Recipe;
