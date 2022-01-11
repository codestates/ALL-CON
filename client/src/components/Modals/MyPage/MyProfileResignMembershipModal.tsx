import ticket from '../../../images/resignTicket.png';

function MyProfileResignMembershipModal() {
  return (
    <div id='myProfileResignMembershipModal'>
      <div id='bg' />
      <div id='modalBox'>
        <div id='modal'>
          <div id='titleWrapper'>
            <p id='title'>회원탈퇴</p>
          </div>
          <div id='imgBox'>
            <div id='imgWrapper'>
              <img className='img' src={ticket} />
            </div>
          </div>
          <div id='explainWrapper'>
            <p className='explain'>
              유태양발닦개 (님)
              <br />
              정말 탈퇴하시겠습니까?
            </p>
          </div>
          <div id='resignBtnWrapper'>
            <button className='resignBtn'>취소</button>
            <button className='cancleBtn'>회원 탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileResignMembershipModal;
