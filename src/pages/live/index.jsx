import React, { PureComponent } from 'react'
import FlvPlayer from '../../components/FlvPlayer';

class Live extends PureComponent {
  render() {
    return <FlvPlayer type="flv" url="http://127.0.0.1:7001/live/movie.flv"/>
  }
}
export default Live;
