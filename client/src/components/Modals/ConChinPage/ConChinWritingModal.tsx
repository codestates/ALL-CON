import defaultImg from '../../../images/default_image.jpg';
function ConChinWritingModal() {
  return (
    <div id='conChinWritingContainer'>
      <div id='outerBackGround'></div>
      <div id='backGround'>
        <div id='writingModal'>
          <img src={defaultImg} alt='이미지' id='image'></img>
          <div id='concert' className='box'>
            1/15 ~ 1/16 정동원 콘서트 세종문화회관
          </div>
          <input
            className='box'
            id='write'
            placeholder='글 제목을 입력해주세요'
          ></input>
          <div id='peopleNum' className='box'>
            <input className='want' placeholder='모집중인 콘친 수'></input>
            <input className='want' placeholder='현재 모인 콘친 수'></input>
          </div>
          <input id='board' placeholder='글 내용을 입력해주세요'></input>
          <div className='box' id='btnBox'>
            <button id='no1'>작성하기</button>
            <button id='no2'>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConChinWritingModal;
