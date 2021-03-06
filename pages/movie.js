/* @flow */

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import React from 'react';

import Loader from '../components/Loader';
import MovieDetails from '../components/MovieDetails';
import page from '../hocs/page';
import TrailerModal from '../components/TrailerModal';
import type { MovieDetailsFragment } from '../components/types';

const MoviePage = ({ movie }: { movie: MovieDetailsFragment }) => {
  const title = movie ? movie.info.title : 'filmstrip';

  return (
    <div>
      <Head>
        <title>{title}</title>
        {movie && <meta name="twitter:card" content="summary_large_image" />}
        {movie && <meta property="og:title" content={title} />}
        {movie && <meta name="twitter:title" content={title} />}
        {movie && (
          <meta name="description" content={movie.info.synopsis} />
        )}
        {movie && (
          <meta property="og:description" content={movie.info.synopsis} />
        )}
        {movie && (
          <meta name="twitter:description" content={movie.info.synopsis} />
        )}
        {movie && movie.info.posterUrl && (
          <meta property="og:image" content={movie.info.posterUrl} />
        )}
        {movie && movie.info.posterUrl && (
          <meta name="twitter:image" content={movie.info.posterUrl} />
        )}
      </Head>
      {movie
        ? <MovieDetails movie={movie} />
        : <Loader />}
      <TrailerModal />
    </div>
  );
};

const MOVIE_QUERY = gql`
  query Movie($slug: String!) {
    movie(slug: $slug) {
      ...MovieDetails
    }
  }
  ${MovieDetails.fragments.details}
`;

const withData = graphql(MOVIE_QUERY, {
  options: ({ url: { query } }: { url: { query: Object } }) => ({
    variables: {
      slug: query.id,
    },
  }),
  props: ({ data: { loading, movie } }: {
    data: {
      loading: boolean,
      movie: MovieDetailsFragment,
    },
  }) => ({
    loading,
    movie,
  }),
});

export default page(withData(MoviePage));
