import shield from '../../images/shield.png';

function ConChinFindBox() {
  return (
    <div id='conChinFindBox'>
      <div className='title'>
        <div className='textWrapper'>
          <span className='text'>콘친 찾기</span>
        </div>
      </div>
      <div className='btnWrapper'>
        <button className='btn'>
          <img className='img' src={shield} />글 쓰기
        </button>
      </div>
    </div>
  );
}
export default ConChinFindBox;
