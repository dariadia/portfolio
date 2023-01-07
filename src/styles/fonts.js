import { css } from 'styled-components';
import LibreBaskervilleRegularSrc from '@fonts/LibreBaskerville/LibreBaskerville-Regular.ttf';
import LibreBaskervilleBoldSrc from '@fonts/LibreBaskerville/LibreBaskerville-Bold.ttf';
import LibreBaskervilleItalicSrc from '@fonts/LibreBaskerville/LibreBaskerville-Italic.ttf';
import WorkSansItalicSrc from '@fonts/WorkSans/WorkSans-Italic.ttf';
import WorkSansRegularSrc from '@fonts/WorkSans/WorkSans.ttf';

const LibreBaskervilleNormal = {
  400: LibreBaskervilleRegularSrc,
  600: LibreBaskervilleBoldSrc,
};

const LibreBaskervilleItalic = {
  400: LibreBaskervilleItalicSrc,
};

const LibreBaskerville = {
  name: 'Libre Baskerville',
  normal: LibreBaskervilleNormal,
  italic: LibreBaskervilleItalic,
};

const WorkSansNormal = {
  400: WorkSansRegularSrc,
  600: WorkSansRegularSrc,
};

const WorkSansItalic = {
  400: WorkSansItalicSrc,
};

const WorkSans = {
  name: 'Work Sans',
  normal: WorkSansNormal,
  italic: WorkSansItalic,
};

const createFontFaces = (family, style = 'normal') => {
  let styles = '';

  for (const [weight, src] of Object.entries(family[style])) {
    styles += `
      @font-face {
        font-family: '${family.name}';
        src: url(${src}) format('ttf');
        font-weight: ${weight};
        font-style: ${style};
        font-display: auto;
      }
    `;
  };

  return styles;
}

const LibreBaskervilleFont = createFontFaces(LibreBaskerville);
const LibreBaskervilleItalicFont = createFontFaces(LibreBaskerville, 'italic');

const WorkSansFont = createFontFaces(WorkSans);
const WorkSansItalicFont = createFontFaces(WorkSans, 'italic');

const Fonts = css`
  ${LibreBaskervilleFont + LibreBaskervilleItalicFont + WorkSansFont + WorkSansItalicFont}
`;

export default Fonts;
