import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { url: '/search', text: '🔎 Tout' },
  { url: '/image', text: '📷 Images' },
  { url: '/video', text: '📺 Vidéos' },
  { url: '/news', text: '📰 Actualités' },
];

export const Links = () => {
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {links.map(({ url, text }) => (
        <NavLink
          key={text}
          to={`${url}`}
          className="m-2 mb-0"
          activeClassName="text-blue-700 border-b-2 dark:text-blue-300 border-blue-700 pb-2"
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};
