import React from 'react'

export const Icon = ({ name }) => {
  switch (name) {
    case 'Bookmark':
      return <FontAwesomeIcon icon="fa-regular fa-circle-bookmark" />
    case 'Codepen':
      return <FontAwesomeIcon icon="fa-brands fa-codepen" />
    case 'External':
      return <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
    case 'Folder':
      return <FontAwesomeIcon icon="fa-regular fa-folder-bookmark" />
    case 'GitHub':
      return <FontAwesomeIcon icon="fa-brands fa-github" />
    case 'Linkedin':
      return <FontAwesomeIcon icon="fa-brands fa-linkedin-in" />
    case 'Loader':
      return <FontAwesomeIcon icon="fa-solid fa-loader" />
    case 'ArrowUp':
      return <FontAwesomeIcon icon="fa-regular fa-circle-arrow-up" />
    case 'Telegram':
      return <FontAwesomeIcon icon="fa-brands fa-telegram" />
    default:
      return <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-from-square" />
  }
}
