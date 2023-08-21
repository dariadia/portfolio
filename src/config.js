module.exports = {
  email: 'dariavdiachkova@gmail.com',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/dariadia',
    },
    {
      name: 'Telegram',
      url: 'https://t.me/redheadalert',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/dariadiachkova/',
    },
    {
      name: 'Codepen',
      url: 'https://codepen.io/dariadia',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Posts',
      url: '/#posts',
    },
    {
      name: 'Recommendations',
      url: '/#recommendations'
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colorsDark: {
    main: '#1D2330',
    complementary: '#134C63',
    accent: '#87D67F',
    highlight: '#F9F871',
    text: '#f6fcf6',
    accentTint: 'rgba(135,214,127, 0.1)',
    accentDark: 'rgba(70,196,70, 0.7)',
    shadowMain: 'rgba(2, 12, 27, 0.7)',
  },

  colors: {
    main: 'white',
    complementary: '#ACB1D6',
    accent: '#566eaf',
    highlight: '#566eaf',
    text: '#030303',
    accentTint: 'rgba(130, 148, 196, 0.9)',
    accentDark: 'rgba(130, 148, 196, 0.6)',
    shadowMain: 'rgba(130, 148, 196, 0.4)',
  },

  srConfig: (delay = 200, viewFactor = 0.1) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
