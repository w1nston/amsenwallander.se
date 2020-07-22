import fs from 'fs';
import path from 'path';

export type IPreparationLink = {
  slug: string;
  title: string;
};

const PREPARATIONS_DIR = path.join(process.cwd(), 'metadata/preparations');

function isJSONFile(file: string): boolean {
  const [, extension] = file.split('.');
  return 'json'.includes(extension);
}

export async function getPreparationMetadataFilenames(): Promise<string[]> {
  const options: any = { encoding: 'utf-8' };
  return new Promise((resolve, reject) => {
    fs.readdir(
      PREPARATIONS_DIR,
      options,
      (error: Error | null, files: string[]) => {
        if (error) {
          return reject(error);
        }

        const manifestFiles = files.filter(isJSONFile);

        return resolve(manifestFiles);
      }
    );
  });
}

export async function getPreparationLinks(): Promise<IPreparationLink[]> {
  let preparationLinks: IPreparationLink[] = [];

  try {
    const metadataFiles = await getPreparationMetadataFilenames();

    const metadataContent = await Promise.all(
      metadataFiles.map((filename) =>
        import(`../../metadata/preparations/${filename}`)
      )
    );

    preparationLinks = metadataContent.map((module) => module.default);
  } catch (error) {
    console.log('Error getting preparation files', error);
  }

  return preparationLinks;
}
