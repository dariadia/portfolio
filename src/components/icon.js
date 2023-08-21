import React from 'react';

const Icon = ({ name }) => {
  switch (name) {
    case 'Bookmark':
      return <i className="fa-regular fa-circle-bookmark" />;
    case 'Codepen':
      return <i className="fa-brands fa-codepen" />;
    case 'External':
      return <span className="fa-link-to">Link to project</span>;
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
    case 'Post':
      return <span className="fa-link-to">Link to post</span>;
    default:
      return <span className="fa-link-to">Live</span>;
  }
}

export default Icon
