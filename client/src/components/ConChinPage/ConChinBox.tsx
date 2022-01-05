import react from 'react';
import shield from '../../images/shield.png'
function ConChinBox(){
  return (
    <div id='conChinBox'>
      <div id='findBox'>
        <div className='title'>
          <span className='text'>콘친 찾기</span>
        </div>
        <div className='explainTitle'>  
          <span className='text'>인증회원만 글을 쓸 수 있어요.</span>
        </div>
        <div className='btnWrapper'>
          <button className='btn'>
            <img className='img' src={shield}/>
              글 쓰기
          </button>
        </div>
      </div>
    </div>
  )
}
export default ConChinBox;