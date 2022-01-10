function ConfirmNumberModal() {
  return (
    <div id='confirmNumberModal'>
      <div id='bg' />
      <div id='modalBox'>
        <div id='modal'>
          <div id='titlesBox'>
            <div id='titleWrapper'>
              <p className='title'>인증번호 입력</p>
            </div>
            <div id='xButtonWrapper'>
              <p className='xButton'>x</p>
            </div>
          </div>
          <div id='exceptTitleBox'>
            <div id='subTitleWrapper'>
              <p className='subTitle'>
                azussi@gmail.com 으로
                <br />
                6자리 인증번호가 전송되었습니다.
              </p>
            </div>
            <div id='inputWrapper'>
              <input className='input' />
              <p className='timer'>3:00</p>
            </div>
            <div id='btnWrapper'>
              <button className='okBtn'>확인</button>
              <button className='resendBtn'>다시 보내기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmNumberModal;
