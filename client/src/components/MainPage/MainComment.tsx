import profileImage from '../../images/taeyang.png';
import articleImage from '../../images/inseong.png';
import shield from '../../images/shield.png';
import tripleDot from '../../images/tripleDot.png';
function MainComment() {
  return (
    <>
      <div id='commentBox'>
        <div id='countWrapper'>
          <h1 className='count'>10개의 댓글</h1>
        </div>
        <div className='box'>
          <div className='dateBox'>
            <p className='nickNameAndDate'>유태양발닦개님 | 2021.01.06</p>
          </div>
          <div id='imgAndText'>
            <div className='imgWrapper'>
              <img className='img' src={profileImage} />
              <img className='shield' src={shield} />
            </div>
            <textarea id='input' placeholder='댓글을 입력해주세요.'></textarea>
          </div>
        </div>

        <div className='box'>
          <div className='dateBox'>
            <p className='nickNameAndDate'>*급해님 | 2021.12.27</p>
            <div className='dotWrapper'>
              <img className='dot' src={tripleDot} />
            </div>
          </div>
          <div id='imgAndText'>
            <div className='imgWrapper'>
              <img className='img' src={articleImage} />
              <img className='shield' src={shield} />
            </div>
            <p id='text'>올콘 뛰세요..? 부럽다...</p>
          </div>
        </div>
        <div className='box'>
          <div className='dateBox'>
            <p className='nickNameAndDate'>*급해님 | 2021.12.27</p>
            <div className='dotWrapper'>
              <img className='dot' src={tripleDot} />
            </div>
          </div>
          <div id='imgAndText'>
            <div className='imgWrapper'>
              <img className='img' src={articleImage} />
              <img className='shield' src={shield} />
            </div>
            <p id='text'>올콘 뛰세요..? 부럽다...</p>
          </div>
        </div>
        <div className='box'>
          <div className='dateBox'>
            <p className='nickNameAndDate'>*급해님 | 2021.12.27</p>
            <div className='dotWrapper'>
              <img className='dot' src={tripleDot} />
            </div>
          </div>
          <div id='imgAndText'>
            <div className='imgWrapper'>
              <img className='img' src={articleImage} />
              <img className='shield' src={shield} />
            </div>
            <p id='text'>올콘 뛰세요..? 부럽다...</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainComment;
