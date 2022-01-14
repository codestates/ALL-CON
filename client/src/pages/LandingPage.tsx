/* CSS import */
import img1 from '../images/landingImage1.png';
import img2 from '../images/landingImage2.png';
import img3 from '../images/landingImage3.png';
import jiyoung from '../images/jiyoung.jpg';
import Footer from '../components/Footer';
import LandingPosterSlide from '../components/LandingPosterSlide';

function LandingPage() {
  return (
    <div id='landingContainer'>
      {/*점보트론 */}
      <div id='landingJumboWrapper'>
        {/*jumbotronBackground */}
        <div id='jumboContainer'>
          <div id='jumboMiniContainer'>
            <img src={jiyoung} alt='선택된 포스터' id='jumboChosen' />
          </div>
          <div className='jumboTopBox'>
            <div className='jumboTextBox'>
              <h1 id='jumboWhat'>국내 모든 콘서트 정보를 한눈에!</h1>
              <h1 id='jumboClassify'>ALL-CON</h1>
            </div>
            <div id='jumboPosterSlideWrapper'>
              <LandingPosterSlide />
            </div>
          </div>
        </div>
      </div>

      {/*중간 박스 */}
      <div id='middleWrapper'>
        <img id='firstImg' src={img1} alt='밴드 일러스트'></img>

        <div className='alignBox'>
          <div id='paddingBox'>
            <div className='grayGif'>
              <div>
                <p>정보를 검색 및</p>
                <p> 확인하는 시연 영상</p>
              </div>
            </div>
          </div>
          <div id='textBox'>
            <div id='texts'>
              <p>ALL-CON은 각 사이트들의 </p>
              <p>콘서트 정보를 한 눈에 볼 수 있는</p>
              <p>콘서트 통합 정보 플랫폼이에요.</p>
              <p>각 사이트들의 단독 기획 콘서트도</p>
              <p>한 눈에 비교해 보세요!</p>
            </div>
          </div>
        </div>

        <img id='secondImg' src={img2} alt='콘친찾기 일러스트'></img>

        <div className='alignBox2'>
          <div id='paddingBox31'>
            <div className='grayGif2'>
              <div>
                <p>콘친을 찾는</p>
                <p> 시연 영상</p>
              </div>
            </div>
          </div>
          <div id='textBox'>
            <div id='texts'>
              <p>콘서트에 가고 싶은데 </p>
              <p>같이 갈 친구가 없어 외로우셨나요?</p>
              <p>함께 즐길 '콘친'을 찾아 보세요!</p>
            </div>
          </div>
        </div>

        <img id='thirdImg' src={img3} alt='알림 일러스트'></img>

        <div className='alignBox3'>
          <div id='paddingBox32'>
            <div className='grayGif3'>
              <div>
                <p>알림을 설정하는</p>
                <p> 시연 영상</p>
              </div>
            </div>
          </div>
          <div id='textBox'>
            <div id='texts'>
              <p>알림 기능으로 내가 원하는 </p>
              <p>콘서트 예매시간을 놓치지</p>
              <p>않을 수 있어요!</p>
            </div>
          </div>
        </div>
      </div>

      {/*하단 박스 */}
      <div id='bottomBox'>
        <div id='bottomAlignBox'>
          <div id='bottomTextBox'>
            <p>음악 취향이 맞는 콘친과 함께</p>
            <p>콘서트를 즐겨요!</p>
          </div>
          <button>시작하기</button>
        </div>
      </div>
      {/*바닥글*/}
      <div id='fullFooter'>
        <div id='landingFooterWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
