import React, { PureComponent } from 'react';
import Reflv from 'reflv'

export default class FlvPlayer extends PureComponent {
  render() {
    const { url, type } = this.props;
    return (
      <Reflv
        url={url}
        type={type}
        isLive
        cors
        config={{
          enableWorker: true,
          enableStashBuffer: false,
          stashInitialSize: 128,
        }}
      />
    )
  }
}
