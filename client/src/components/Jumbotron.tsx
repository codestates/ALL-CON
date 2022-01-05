import PosterSlide from './PosterSlide';
import six from '../images/six.gif';

function Jumbotron() {
  return (
    <div id='jumboContainer'>
      <div id='jumboMiniContainer'>
        <img src={six} alt='선택된 포스터' id='jumboChosen' />
      </div>
      <div className='jumboTopBox'>
        <div className='jumboTextBox'>
          <h1 id='jumboWhat'>WHAT'S</h1>
          <h1 id='jumboClassify'>HOT</h1>
        </div>
        <div id='jumboPosterSlideWrapper'>
          <PosterSlide />
        </div>
      </div>
    </div>
  );
}
export default Jumbotron;
