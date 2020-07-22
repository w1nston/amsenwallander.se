import Head from 'next/head';
import PreparationLink from '../../components/preparation/PreparationLink';
import { IPreparationLink, getPreparationLinks } from '../../api/preparation';

type Props = {
  preparationLinks: IPreparationLink[];
};

export default function Preparations({ preparationLinks }: Props) {
  return (
    <>
      <Head>
        <title>Förberedelser</title>
      </Head>
      <main>
        {preparationLinks.map((link) => (
          <PreparationLink key={link.slug} slug={link.slug} title={link.title} />
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const preparationLinks = await getPreparationLinks();

  return {
    props: {
      preparationLinks,
    },
  };
}
