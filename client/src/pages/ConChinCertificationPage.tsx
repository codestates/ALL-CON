import MyProfileBox from '../components/MyPage/MyProfileBox';
import Footer from '../components/Footer';

/* Config import */
import { REACT_APP_API_URL, REACT_APP_DEFAULTUSERIMAGE_URL, REACT_APP_IMAGE_URL  } from '../config'
/* CSS import */
import check from '../images/check.png'
/* Store import */
import { RootState } from '../index';
import { logout, getUserInfo, getCertificateInfo, getPhoneCertificatePassInfo } from '../store/AuthSlice';
import { showConfirmNumberModal, showPhoneConfirmNumberModal, insertAlertText, showAlertModal, insertDeliverText } from '../store/ModalSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinCertificationPage() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  /* useSelector */
  const { userInfo, isPhoneCertificatePass } = useSelector((state: RootState) => state.auth);
  
  /* 지역상태 - useState */

  // 변경할 유저정보 상태 
  interface ConchinCertificateInfo {
    birthYear: string;
    birthMonth: string;
    birthDate: string;
    gender: string;
    phoneNumber: string;
  }

  // 주의: 초기값을 바꿔줘야한다!
  const [conchinCertificateInfo, setConchinCertificateInfo] = useState<ConchinCertificateInfo>({
    birthYear: '',
    birthMonth: '',
    birthDate: '',
    gender: '남자',
    phoneNumber: '',
  });

  // 인증번호 받기 버튼 클릭 유무 확인 상태 
  const [checkImg, setCheckImg] = useState<boolean>(false)

  /* useEffect */
  useEffect(() => {
    
    dispatch(getPhoneCertificatePassInfo(false))

  }, [])

  /* handler 함수 (기능별 정렬) */

  // 인풋 입력 핸들러
  const inputValueHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {

    const info = { ...conchinCertificateInfo, [key]: e.target.value };
    setConchinCertificateInfo(info);
    console.log('--- conchinCertificateInfo 확인! ---', conchinCertificateInfo)
    // isAllValid(info);
  };

  // 인풋 입력 핸들러
  const genderValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key: string = 'gender'
    const info = { ...conchinCertificateInfo, [key]: e.target.value };
    setConchinCertificateInfo(info);
    console.log('--- conchinCertificateInfo 확인! ---', conchinCertificateInfo)
    // isAllValid(info);
  };

  const isAllValid = (conchinCertificateInfo: ConchinCertificateInfo): boolean => {

    const { birthYear, birthMonth, birthDate, gender, phoneNumber} = conchinCertificateInfo

    const isBirthYearValid = birthYear ? true : false;
    const isBirthMonthValid = birthMonth ? true : false;
    const isBirthDateValid = birthDate ? true : false;
    const isGenderValid = gender ? true : false;
    const isPhoneNumberValid = phoneNumber ? true : false;

    // 인증번호 받기 버튼이 클릭되었는지
    const isGetConfirmNumberClicked = checkImg

    console.log('1', isBirthYearValid)
    console.log('2', isBirthMonthValid)
    console.log('3', isBirthDateValid)
    console.log('4', isGenderValid)
    console.log('5', isPhoneNumberValid)
    console.log('6', isGetConfirmNumberClicked)
    console.log('7', isPhoneCertificatePass)

    return isBirthYearValid && isBirthMonthValid && isBirthDateValid && isGenderValid && isPhoneNumberValid && isGetConfirmNumberClicked && isPhoneCertificatePass ? true : false;
  }

  // 인증번호 받기 버튼 핸들러
  const handleGetConfirmNumber = async () => {
    // 인증번호 받기 눌렀다!
    setCheckImg(true)
    dispatch(getPhoneCertificatePassInfo(false))

    dispatch(showPhoneConfirmNumberModal(true));
    dispatch(getCertificateInfo(conchinCertificateInfo.phoneNumber))
    
    // 입력된 휴대번호로 6자리 인증번호를 전송한다 (주의! 휴대폰 번호는 변수로 다시 지정해줘야 한다!)
    const response = await axios.post(
      `${REACT_APP_API_URL}/user/safe`,
      { phone_number: `${conchinCertificateInfo.phoneNumber}` },
      { withCredentials: true }
      );
  }

  // 인증 완료 버튼 핸들러
  const handleCompleteCertificateBtn = async () => {

    const birth = conchinCertificateInfo.birthYear + '.' + conchinCertificateInfo.birthMonth + '.' + conchinCertificateInfo.birthDate

    console.log('인증 완료 버튼 핸들러 확인!')
    if(isAllValid(conchinCertificateInfo)) {
      const response = await axios.patch(
        `${REACT_APP_API_URL}/user/safe`,
        { 
          birth: birth,
          gender: conchinCertificateInfo.gender,
          phone_number: conchinCertificateInfo.phoneNumber
        },
        { withCredentials: true }
      );
      // 입력값들을 reset
      // resetInput();
      navigate('/mypage')
      dispatch(insertAlertText(`(${userInfo.username})님의 프로필이 변경되었습니다! 🙂`));
      dispatch(showAlertModal(true));
      
    }  else {
      dispatch(insertAlertText(`문제가 있음! 🙂`));
      dispatch(showAlertModal(true));
    }
    
  }

  // 취소 버튼 핸들러
  const handleCloseBtn = async () => {
    // 취소 버튼을 클릭하면 마이페이지로 이동
    navigate('/mypage')
  }

  return (
    <div id='conChinCertificationPage'>
      <div id='profileBoxWrapper'>
        {/* 프로필 */}
        <MyProfileBox />
      </div>
      <div id='userInfoWrapper'>
        {/* 유저 정보 */}
        <div id='userInfoBox'>
          <div id='emailWrapper'>
            <div id='titleWrapper'>
              <p className='title'>이메일</p>
            </div>
            <div id='email'> {`${userInfo.email}`} </div>
          </div>

          <div id='birthdayWrapper'>
            <div id='titleWrapper'>
              <p className='title'>생년월일</p>
            </div>
            <div id='birthdayBox'>
              <input type='text' className='short' placeholder='년(4자)' onChange={inputValueHandler('birthYear')} />
              <input type='text' className='short' placeholder='월' onChange={inputValueHandler('birthMonth')} />
              {/* <select className='short' >
              <option > 월 </option>
                <option value="1월"> 1월 </option>
                <option value="2월"> 2월 </option>
                <option value="3월"> 3월 </option>
                <option value="4월"> 4월 </option>
                <option value="5월"> 5월 </option>
                <option value="6월"> 6월 </option>
                <option value="7월"> 7월 </option>
                <option value="8월"> 8월 </option>
                <option value="9월"> 9월 </option>
                <option value="10월"> 10월 </option>
                <option value="11월"> 11월 </option>
                <option value="12월"> 12월 </option>
            </select> */}
              <input type='text' className='short' placeholder='일' onChange={inputValueHandler('birthDate')} />
            </div>
          </div>
          <div id='genderBox'>
            <div id='titleWrapper'>
              <p className='title'>성별</p>
            </div>
            {/* <span className='gender'>성별</span> */}
            {/* <select className='gender'   onChange={genderValueHandler} > */}
            <select className='gender'>
              <option > 성별 </option>
              <option value="남자"> 남자 </option>
              <option value="여자"> 여자 </option>
            </select>
          </div>
          <div id='phoneBox'>
            <div id='titleWrapper'>
              <p className='title'>휴대전화</p>
            </div>
            <div id='region'>대한민국 +82</div>
            <div className='certificationWrapper'>
              <div className='recieveWrapper'>
                <input className='number' placeholder='전화번호 입력' onChange={inputValueHandler('phoneNumber')}/>
                <img className={checkImg&&isPhoneCertificatePass ? 'checkImg' : 'hidden' } src={check}  />
                <button className='receiveBtn' onClick={() => {handleGetConfirmNumber()}} >인증번호 받기</button>
              </div>
              {/* <div className='confirmWrapper'>
                <input
                  className='number'
                  placeholder='인증번호를 입력하세요.'
                />
                <button className='confirmBtn' onClick={() => {handleCheckConfirmNumber()}} >인증번호 확인</button>
              </div> */}
            </div>
          </div>
          <div id='btnBox'>
            <div id='btnWrapper'>
              <button className='completeBtn' onClick={() => {handleCompleteCertificateBtn()}} >인증 완료</button>
              <button className='cancelBtn' onClick={() => {handleCloseBtn()}} >취소</button>
            </div>
          </div>
        </div>
      </div>
      <div id='fullFooter'>
        <div id='footerWrapper'>
          {/* 푸터 */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ConChinCertificationPage;
