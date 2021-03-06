/* @flow */

import { connect } from 'react-redux';
import { style } from 'next/css';
import React from 'react';

import { openTrailerModal } from '../data/actions/ui';
import PlayIcon from './PlayIcon';
import t from '../styles/tachyons';
import type { Dispatch } from '../data/types';

const PlayTrailerButton = (props: {
  youtubeId: string,
  scale?: number,
  openTrailerModal: (youtubeId: string) => void,
}) => (
  <button
    className={styles.trailerPlayButton}
    style={{
      width: 50 * (props.scale || 1),
      height: 50 * (props.scale || 1),
    }}
    onClick={() => props.openTrailerModal(props.youtubeId)}
  >
    <PlayIcon scale={props.scale} />
  </button>
);

const styles = {
  trailerPlayButton: style({
    ...t.absolute,
    ...t.absolute__fill,
    ...t.input_reset,
    ...t.button_reset,
    ...t.bg_transparent,
    ...t.pa0,
    ...t.o_90,
    ...t.outline_0,
    ...t.bn,
    margin: 'auto',
    ':hover': t.o_100,
  }),
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openTrailerModal: (youtubeId: string) => {
    dispatch(openTrailerModal(youtubeId));
  },
});

export default connect(null, mapDispatchToProps)(PlayTrailerButton);
