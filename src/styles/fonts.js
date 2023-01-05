import { css } from 'styled-components';

import LibreBaskervilleRegularSrc from '@fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf';
import LibreBaskervilleBoldSrc from '@fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf';
import LibreBaskervilleItalicSrc from '@fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf';

import MontserratRegularSrc from '@fonts/Montserrat/Montserrat-Regular.ttf';
import MontserratBoldSrc from '@fonts/Montserrat/Montserrat-Bold.ttf';
import MontserratItalicSrc from '@fonts/Montserrat/Montserrat-Italic.ttf';
import MontserratBoldItalicSrc from '@fonts/Montserrat/Montserrat-BoldItalic.ttf';
import MontserratSemiBoldSrc from '@fonts/Montserrat/Montserrat-SemiBold.ttf';

const LibreBaskervilleNormal = {
  400: LibreBaskervilleRegularSrc,
  600: LibreBaskervilleBoldSrc,
};

const LibreBaskervilleItalic = {
  400: LibreBaskervilleItalicSrc,
};

const MontserratNormal = {
  400: MontserratRegularSrc,
  500: MontserratSemiBoldSrc,
  600: MontserratBoldSrc,
};

const MontserratItalic = {
  400: MontserratItalicSrc,
  600: MontserratBoldItalicSrc,
};

const LibreBaskerville = {
  name: 'Libre Baskerville',
  normal: LibreBaskervilleNormal,
  italic: LibreBaskervilleItalic,
};

const Montserrat = {
  name: 'Montserrat',
  normal: MontserratNormal,
  italic: MontserratItalic,
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
  }

  return styles;
};

const LibreBaskervilleFont = createFontFaces(LibreBaskerville);
const LibreBaskervilleItalicFont = createFontFaces(LibreBaskerville, 'italic');

const MontserratFont = createFontFaces(Montserrat);
const MontserratItalicFont = createFontFaces(Montserrat, 'italic');

const Fonts = css`
  ${LibreBaskervilleFont + LibreBaskervilleItalicFont + MontserratFont + MontserratItalicFont}
`;

export default Fonts;
