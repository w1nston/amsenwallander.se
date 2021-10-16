import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../../../public/icon/aw-logo.png';
import Link from '../../../lib/material-ui/adapters/Link';

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar position="fixed" sx={{ height: '5rem' }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Link color="inherit" href="/" sx={{ margin: '0.5rem 1rem 0 0' }}>
            <Image src={Logo} alt="Logo" width={48} height={48} />
          </Link>
          <Link
            color="inherit"
            href="/recipes"
            sx={{ fontSize: '1.5rem', marginRight: '1rem' }}
          >
            Recept
          </Link>
          <Link
            color="inherit"
            href="/preparations"
            sx={{ fontSize: '1.5rem' }}
          >
            Förberedelser
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
