/* CSS import */
import crown from '../images/crown.png';
import jiyoung from '../images/jiyoung.jpg';
import chris from '../images/chris.jpg';
import jh2 from '../images/jh2.png';
import yoo from '../images/yoosu.png';
import couple from '../images/couple.png';

function LandingPosterSlide() {
  return (
    <div className='posterContainer'>
      <div id='posterWrapper1'>
        <img alt='포스터' src={jh2} className='posterImg' id='poster'></img>
        <div className='posterCover2'></div>
      </div>
      <div id='posterWrapper2'>
        <img alt='포스터' src={chris} className='posterImg' id='poster'></img>
        <div className='posterCover'></div>
      </div>
      <div id='posterWrapper3'>
        <img alt='포스터' src={jiyoung} className='posterImg' id='poster'></img>
        <div className='dDay'>
          <p>D-5</p>
        </div>
      </div>
      <div id='posterWrapper4'>
        <img alt='포스터' src={yoo} className='posterImg' id='poster'></img>
        <div className='posterCover'></div>
      </div>
      <div id='posterWrapper5'>
        <img alt='포스터' src={couple} className='posterImg' id='poster'></img>
        <div className='posterCover2'></div>
      </div>
    </div>
  );
}

export default LandingPosterSlide;
