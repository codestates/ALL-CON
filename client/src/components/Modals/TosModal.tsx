function TosModal() {
  /*Tos = Terms of service 이용약관*/
  return (
    <div id='TosModalContainer'>
      <div id='background'>
        <div id='tosModal'>
          <div id='alignContainer'>
            <div id='topBox'>
              <h2>이용 약관</h2>
            </div>
            <div id='midBox'>
              <p className='fontMatch'>약관 1</p>
              <p>
                {' '}
                가. 서비스 제공 교육 콘텐츠 제공, 본인인증, 증명서발급(교육
                수료증) 등 서비스 제공에 관련한 목적으로 개인정보를 처리합니다.
                협박 사례를 적극 신고하시기 바랍니다. 나. 민원처리 개인정보
                열람, 개인정보 정정·삭제, 개인정보 처리정지 요구, 개인정보
                유출사고 신고 등 개인정보와 관련된 민원처리를 목적으로
                개인정보를 처리합니다. ② 개인정보보호위원회가 개인정보 보호법
                제32조에 따라 등록·공개하는 개인정보파일의 처리목적은 다음과
                같습니다. 순번 개인정보파일의 명칭 운영근거 처리목적
                1.교육서비스 제공 사용자 정보 정보주체 동의 개인정보보호
                온라인교육에 대한 본인인증, 교육이력관리, 교육수료증 발급
                2.개인정보 열람등요구 처리 사용자 정보 개인정보보호법
                제35조-제39조 개인정보 열람등요구 처리 행정업무의 참고 또는 사실
                증명
              </p>
              <p className='fontMatch'>약관 2</p>
              <p>
                제2조 (개인정보의 처리 및 보유 기간) ① 개인정보보호위원회는
                법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
                개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서
                개인정보를 처리·보유합니다. ② 각각의 개인정보 처리 및 보유
                기간은 다음과 같습니다. 순번 개인정보파일의 명칭 운영근거
                보유기간 (목적 달성시) 1.교육서비스 제공 사용자 정보 정보주체
                동의 2년 2.개인정보 열람등요구 처리 사용자 정보 개인정보보호법
                제35조-제39조 3년
              </p>
              <p className='fontMatch'>약관 3</p>
            </div>
            <div id='bottomBox'>
              <button className='fontMatch textBoxMatch3' id='agree'>
                동의
              </button>
              <button className='fontMatch textBoxMatch3' id='disagree'>
                <p>동의 안함</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TosModal;
