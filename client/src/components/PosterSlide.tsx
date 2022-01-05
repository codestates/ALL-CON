import crown from '../images/crown.png';
import sf9 from '../images/sf99.jpg';
import six from '../images/six.gif';
import hiphop from '../images/hiphop.gif';
import hiphop2 from '../images/hiphop2.gif';
import kimjh from '../images/kimjh.jpg';

function PosterSlide() {
  return (
    <>
      <div className='posterContainer'>
        <div id='crownWrapper'>
          <img id='posterCrown' src={crown}></img>
        </div>
        <div id='posterWrapper2'>
          <img alt='포스터' src={sf9} className='posterImg' id='poster'></img>
        </div>
        <div id='posterWrapper1'>
          <img alt='포스터' src={six} className='posterImg' id='poster'></img>
        </div>
        <div id='posterWrapper3'>
          <img alt='포스터' src={kimjh} className='posterImg' id='poster'></img>
        </div>
        <div id='posterWrapper4'>
          <img
            alt='포스터'
            src={hiphop2}
            className='posterImg'
            id='poster'
          ></img>
        </div>
        <div id='posterWrapper5'>
          <img
            alt='포스터'
            src={hiphop}
            className='posterImg'
            id='poster'
          ></img>
        </div>
      </div>
    </>
  );
}

export default PosterSlide;
