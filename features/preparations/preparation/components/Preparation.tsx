import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

type PreparationProps = {
  title: string;
} & { children: ReactNode };

function Preparation({ children, title }: PreparationProps) {
  return (
    <Container>
      <Typography
        variant="h1"
        sx={{ fontSize: '2.5rem', marginTop: '1.625rem' }}
      >
        {title}
      </Typography>
      <Box>{children}</Box>
    </Container>
  );
}

export default Preparation;
