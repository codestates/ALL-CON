import profileImage from '../../images/taeyang.png';
import groupImage from '../../images/group.png';
import articleImage from '../../images/inseong.png'
import shield from '../../images/shield.png';
import tripleDot from '../../images/tripleDot.png';

function ConChinArticleContentBox(){
  return (
    <div id='conChinArticleContentBox'>
      <div id='titleBox'>
        <div className='title'>
          <h1 className='text'>콘친님께 슬로건 dream</h1>
        </div>
        <div id='profileBox'>
          <img className='img' src={ profileImage }/>
          <p className='nickName'>유태양발닦개</p>
        </div>
      </div>
      <div id='contentBox'>
        <div id='viewBox'>
          <p className='view'>등록일 : 2021.12.29 | 조회수 : 54</p>
        </div>
        <div id='modifyBox'>
          <p className='modifyBtn'>수정</p>
          <p className='deleteBtn'>삭제</p>
          <div id='memberBoxWrapper'>
            <div className='memberBox'>
              <img className='icon' src={ groupImage }/>
              <div className='count'>1/3</div>
            </div>
          </div>
        </div>
        <div id='content'>
          <div id='imgWrapper'>
            <img className='img' src={ articleImage }/>
          </div>
          <p className='text'>올림픽 공원을 뒤집을 에너자이저 콘친 찾습니다..!
            21~23 올콘 뛰시는 분으로 구해요
            인성이 슬로건 드립니다ㅎㅎ<br/>
            판타지 모여라<br/>
            많관부~
          </p>
        </div>
        <div id='commentWrapper'>
           <div id='commentBox'>
             <div id='countWrapper'>
               <h1 className='count'>10개의 댓글</h1>
             </div>  
            <div className='box'>
              <div className='dateBox'>
                <p className='nickNameAndDate'>유태양발닦개님 | 2021.01.06</p>
              </div>
              <div className='imgWrapper'>
                <img className='img' src={ profileImage }/>
                <img className='shield' src={ shield }/>
              </div>
              <textarea id='input' placeholder='댓글을 입력해주세요.'></textarea>
            </div>

            <div className='box'>
              <div className='dateBox'>
                <p className='nickNameAndDate'>*급해님 | 2021.12.27</p>
              </div>
              <div className='imgWrapper'>
                <img className='img' src={ articleImage }/>
                <img className='shield' src={ shield }/>
              </div>
              <div className='dotWrapper'>
                <img className='dot' src={ tripleDot }/>
              </div>
              <p id='text'>올콘 뛰세요..? 부럽다...</p>
            </div>
            <div className='box'>
              <div className='dateBox'>
                <p className='nickNameAndDate'>*급해님 | 2021.12.27</p>
              </div>
              <div className='imgWrapper'>
                <img className='img' src={ articleImage }/>
                <img className='shield' src={ shield }/>
              </div>
              <div className='dotWrapper'>
                <img className='dot' src={ tripleDot }/>
              </div>
              <p id='text'>올콘 뛰세요..? 부럽다...</p>
            </div>
            <div className='box'>
              <div className='dateBox'>
                <p className='nickNameAndDate'>*급해님 | 2021.12.27</p>
              </div>
              <div className='imgWrapper'>
                <img className='img' src={ articleImage }/>
                <img className='shield' src={ shield }/>
              </div>
              <div className='dotWrapper'>
                <img className='dot' src={ tripleDot }/>
              </div>
              <p id='text'>올콘 뛰세요..? 부럽다...</p>
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
      </div>
    </div>
  )
}

export default ConChinArticleContentBox;