import ScrollReveal from 'scrollreveal';

const isServerSideRender = typeof window === 'undefined';
const isServer = isServerSideRender ? null : ScrollReveal();

export default isServer;
