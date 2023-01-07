import React from 'react';

const Icon = ({ name }) => {
  switch (name) {
    case 'Bookmark':
      return <i className="fa-regular fa-circle-bookmark" />;
    case 'Codepen':
      return <i className="fa-brands fa-codepen" />;
    case 'External':
      return <i className="fa-solid fa-arrow-up-right-from-square" />;
    case 'Folder':
      return <i className="fa-regular fa-folder-bookmark" />;
    case 'GitHub':
      return <i className="fa-brands fa-github"></i>;
    case 'Linkedin':
      return <i className="fa-brands fa-linkedin-in" />;
    case 'ArrowUp':
      return <i className="fa-solid fa-circle-arrow-up" />;
    case 'Telegram':
      return <i className="fa-brands fa-telegram" />;
    default:
      return <i className="fa-solid fa-arrow-up-right-from-squar" />;
  }
}

export default Icon
