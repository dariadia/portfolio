import React from 'react';

const Icon = ({ name }) => {
  switch (name) {
    case 'Bookmark':
      return <i class="fa-regular fa-circle-bookmark" />;
    case 'Codepen':
      return <i class="fa-brands fa-codepen" />;
    case 'External':
      return <i class="fa-solid fa-arrow-up-right-from-square" />;
    case 'Folder':
      return <i class="fa-regular fa-folder-bookmark" />;
    case 'GitHub':
      return <i class="fa-brands fa-github"></i>;
    case 'Linkedin':
      return <i class="fa-brands fa-linkedin-in" />;
    case 'ArrowUp':
      return <i class="fa-solid fa-circle-arrow-up" />;
    case 'Telegram':
      return <i class="fa-brands fa-telegram" />;
    default:
      return <i class="fa-solid fa-arrow-up-right-from-squar" />;
  }
}

export default Icon
