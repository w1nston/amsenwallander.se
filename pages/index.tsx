import Head from 'next/head';
import styles from '../styles/Home.module.css';

function Home() {
  return (
    <>
      <Head>
        <title>Amsen-Wallander</title>
      </Head>
      <main className={styles.main__container}>
        <p>
          Välkommen in till vår stuga. Här samlar vi recept som vi själva brukar
          laga ofta.
        </p>
      </main>
    </>
  );
}

export default Home;
