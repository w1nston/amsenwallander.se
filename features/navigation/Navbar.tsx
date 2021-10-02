import Link from 'next/link';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar__container}>
      <Link href="/recipes">
        <a>Recept</a>
      </Link>
      <Link href="/preparations">
        <a>Förberedelser</a>
      </Link>
    </nav>
  );
}

export default Navbar;
