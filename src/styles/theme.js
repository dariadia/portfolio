import mixins from './mixins';

const theme = {
  bp: {
    mobileSmall: `max-width: 330px`,
    mobileMedium: `max-width: 400px`,
    mobileLarge: `max-width: 480px`,
    tabletSmall: `max-width: 600px`,
    tabletLarge: `max-width: 768px`,
    desktopSmallest: `max-width: 900px`,
    desktopSmall: `max-width: 1080px`,
    desktopMedium: `max-width: 1200px`,
    desktopLarge: `max-width: 1400px`,
  },

  mixins,
};

export default theme;
