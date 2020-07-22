import Link from 'next/link';

type Props = {
  path: string;
  text: string;
};

// TODO: Style these links...

export default function InternalRecipeLink({ path, text }: Props) {
  return (
    <Link href={path}>
      <a>{text}</a>
    </Link>
  );
}
