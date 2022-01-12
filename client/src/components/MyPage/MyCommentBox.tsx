import profileImage from '../../images/taeyang.png';
import articleImage from '../../images/inseong.png';
import shield from '../../images/shield.png';
import tripleDot from '../../images/tripleDot.png';

function MyCommentBox() {
  return (
    <div id='myCommentBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 댓글</p>
      </div>
      <div id='commentWrapper'>
        <div id='commentBox'>
          <div id='countWrapper'>
            <h1 className='count'>10개의 댓글</h1>
          </div>
          <div className='box'>
            <div className='dateBox'>
              <p className='nickNameAndDate'>유태양발닦개님 | 2021.12.27</p>
              <div className='dotWrapper'>
                <img className='dot' src={tripleDot} alt='tripleDot' />
              </div>
            </div>
            <div id='imgAndText'>
              <div className='imgWrapper'>
                <img className='img' src={profileImage} alt='profileImage' />
                <img className='shield' src={shield} alt='shield' />
              </div>
              <p id='text'>부럽다...</p>
            </div>
          </div>
          <div className='box'>
            <div className='dateBox'>
              <p className='nickNameAndDate'>유태양발닦개님 | 2021.12.27</p>
              <div className='dotWrapper'>
                <img className='dot' src={tripleDot} alt='tripleDot' />
              </div>
            </div>
            <div id='imgAndText'>
              <div className='imgWrapper'>
                <img className='img' src={profileImage} alt='profileImage' />
                <img className='shield' src={shield} alt='shield' />
              </div>
              <p id='text'>부럽다...</p>
            </div>
          </div>
          <div className='box'>
            <div className='dateBox'>
              <p className='nickNameAndDate'>유태양발닦개님 | 2021.12.27</p>
              <div className='dotWrapper'>
                <img className='dot' src={tripleDot} alt='tripleDot' />
              </div>
            </div>
            <div id='imgAndText'>
              <div className='imgWrapper'>
                <img className='img' src={profileImage} alt='profileImage' />
                <img className='shield' src={shield} alt='shield' />
              </div>
              <p id='text'>부럽다...</p>
            </div>
          </div>
        </div>
      </div>
      <div id='paginationWrapper'>
        <div id='pagination'>
          <ul className='page'>
            <p className='text'>1</p>
          </ul>
          <ul className='page'>
            <p className='text'>2</p>
          </ul>
          <ul className='page'>
            <p className='text'>3</p>
          </ul>
          <ul className='page'>
            <p className='text'>4</p>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyCommentBox;
