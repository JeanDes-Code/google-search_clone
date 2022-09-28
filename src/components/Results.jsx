import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/videos') {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map((item, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a
                href={item?.link}
                target="_blank"
                rel="noreferrer"
                title={item?.title}
              >
                <p className="text-sm">
                  {item?.link?.length > 30
                    ? item?.link?.substring(0, 30)
                    : item?.link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {item?.title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case '/image':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map((item, index) => (
            <a
              className="sm:p-3 p-5"
              href={item?.link?.href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={item?.image?.src}
                alt={item?.link?.title}
                loading="lazy"
              />
              <p className="w-36 break-words text-sm mt-2">
                {' '}
                {item?.link?.title}
              </p>
            </a>
          ))}
        </div>
      );

    case '/video':
      return (
        <div className="flex flex-wrap">
          {results?.map((video, index) => (
            <div key={index} className="p-2">
              {video?.additional_links?.[0]?.href.includes(
                'youtube.com' || 'youtube.fr' || 'youtu.be',
              ) && (
                <ReactPlayer
                  url={video?.additional_links?.[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );

    case '/news':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.map((item) => (
            <div key={item?.id} className="md:w-2/5 w-full">
              <a
                href={item?.links?.[0].href}
                target="_blank"
                rel="noreferrer"
                title={item?.title}
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {item?.title}
                </p>
              </a>
              <div className="flex gap-4">
                <a href={item?.source?.href} target="_blank" rel="noreferrer">
                  {item?.source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );

    default:
      return 'Erreur !';
  }
};
