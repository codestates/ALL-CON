/* CSS import */
import check from '../images/check.png';
/* Store import */
import { RootState } from '../index';
import {
  loginCheck,
  getUserInfo,
  getCertificateInfo,
  getPhoneCertificatePassInfo,
} from '../store/AuthSlice';
import {
  showConfirmNumberModal,
  showPhoneConfirmNumberModal,
  insertAlertText,
  insertBtnText,
  showAlertModal,
  showSuccessModal,
  insertDeliverText,
} from '../store/ModalSlice';
import { getBtnSwitchState } from '../store/MySlice';
/* Component import */
import MyProfileBox from '../components/MyPage/MyProfileBox';
import Footer from '../components/Footer';
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
  const { userInfo, isPhoneCertificatePass, yearList, monthList, dateList } =
    useSelector((state: RootState) => state.auth);

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
  const [conchinCertificateInfo, setConchinCertificateInfo] =
    useState<ConchinCertificateInfo>({
      birthYear: '',
      birthMonth: '',
      birthDate: '',
      gender: '',
      phoneNumber: '',
    });

  // 인증번호 받기 버튼 클릭 유무 확인 상태
  const [checkImg, setCheckImg] = useState<boolean>(false);

  /* useEffect */
  useEffect(() => {
    dispatch(getPhoneCertificatePassInfo(false));
  }, []);

  /* handler 함수 (기능별 정렬) */
  // (생년월일) 년 / 월 / 일, (성별) 남자 / 여자 인풋 입력 핸들러
  const inputDropdownValueHandler =
    (key: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const info = { ...conchinCertificateInfo, [key]: e.target.value };
      setConchinCertificateInfo(info);
    };

  // 핸드폰 번호 인풋 입력 핸들러
  const inputValueHandler =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const info = { ...conchinCertificateInfo, [key]: e.target.value };
      setConchinCertificateInfo(info);
    };

  const isAllValid = (
    conchinCertificateInfo: ConchinCertificateInfo,
  ): boolean => {
    const { birthYear, birthMonth, birthDate, gender, phoneNumber } =
      conchinCertificateInfo;

    const isBirthYearValid = birthYear ? true : false;
    const isBirthMonthValid = birthMonth ? true : false;
    const isBirthDateValid = birthDate ? true : false;
    const isGenderValid = gender ? true : false;
    const isPhoneNumberValid = phoneNumber ? true : false;

    // 인증번호 받기 버튼이 클릭되었는지
    const isGetConfirmNumberClicked = checkImg;

    return isBirthYearValid &&
      isBirthMonthValid &&
      isBirthDateValid &&
      isGenderValid &&
      isPhoneNumberValid &&
      isGetConfirmNumberClicked &&
      isPhoneCertificatePass
      ? true
      : false;
  };

  // 인증번호 받기 버튼 핸들러
  const handleGetConfirmNumber = async () => {

    const firstThreeNumber = conchinCertificateInfo.phoneNumber[0] + conchinCertificateInfo.phoneNumber[1] + conchinCertificateInfo.phoneNumber[2]

    // 입력한 휴대폰 앞에 세자리가 '010'이 아니거나 11자리 휴대폰 번호를 입력하지 않았다면, 다음을 실행한다.
    if(firstThreeNumber !== '010' || conchinCertificateInfo.phoneNumber.length !== 11) {
      dispatch(insertAlertText(`휴대폰 번호를 정확히 입력해주세요! 🙂`));
      dispatch(showAlertModal(true))
    }
    // 휴대폰 번호가 정확히 입력되었다면 다음을 실행한다
    else {
      // 인증번호 받기 버튼을 눌렀다!
      setCheckImg(true);
      dispatch(getPhoneCertificatePassInfo(false));
      
      dispatch(showPhoneConfirmNumberModal(true));
      dispatch(getCertificateInfo(conchinCertificateInfo.phoneNumber));
      
      // 입력된 휴대번호로 6자리 인증번호를 전송한다
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/safe`,
        { phone_number: `${conchinCertificateInfo.phoneNumber}` },
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if(response.data.message === 'Unauthorized userInfo!') return dispatch(loginCheck(false));
    }
  };

  // 인증 완료 버튼 핸들러
  const handleCompleteCertificateBtn = async () => {
    // 생년월일 정의: ex) 1993.11.2
    const numBirthYear = Number(
      conchinCertificateInfo.birthYear.replace('년', ''),
    );
    const numBirthMonth = Number(
      conchinCertificateInfo.birthMonth.replace('월', ''),
    );
    const numBirthDate = Number(
      conchinCertificateInfo.birthDate.replace('일', ''),
    );
    const birth = numBirthYear + '.' + numBirthMonth + '.' + numBirthDate;

    // 생년월일 / 성별 / 인증번호 확인까지 모두 기입되었으면, 콘친 인증회원으로 유저 프로필 정보 업데이트
    if (isAllValid(conchinCertificateInfo)) {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/user/safe`,
        {
          birth: birth,
          gender: conchinCertificateInfo.gender,
          phone_number: conchinCertificateInfo.phoneNumber,
        },
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if(response.data.message === 'Unauthorized userInfo!') return dispatch(loginCheck(false));
      
      // 콘친 인증 성공 모달 OPEN
      dispatch(insertAlertText(`(${userInfo.username})님의 콘친 인증이 완료되었습니다! 🙂`));
      dispatch(insertBtnText('확인'));
      dispatch(showSuccessModal(true));
      // 프로필 정보 업데이트
      dispatch(getUserInfo(response.data.data.userInfo));
      // 모든 버튼 SWITCHOFF
      dispatch(getBtnSwitchState({ profileEdit: false, conchinCertification: false }))
      // 마이페이지로 이동
      navigate('/mypage');
    } else {
      // 생년월일이 입력되지 않은 경우, 다음을 실행한다
      if(!conchinCertificateInfo.birthYear || !conchinCertificateInfo.birthMonth || !conchinCertificateInfo.birthDate) {
        dispatch(insertAlertText(`생년월일을 정확하게 입력해주세요! 🙂`));
        dispatch(showAlertModal(true));
      } 
      // 성별을 선택하지 않은 경우, 다음을 실행한다
      else if(!conchinCertificateInfo.gender) {
        dispatch(insertAlertText(`성별을 선택해주세요! 🙂`));
        dispatch(showAlertModal(true));
      }
      // 휴대전화를 입력하지 않은 경우, 다음을 실행한다
      else if(!conchinCertificateInfo.phoneNumber) {
        dispatch(insertAlertText(`휴대전화를 정확하게 입력해주세요! 🙂`));
        dispatch(showAlertModal(true));
      } 
      // 휴대전화를 인증하지 않은 경우, 다음을 실행한다
      else if(!isPhoneCertificatePass) {
        dispatch(insertAlertText(`휴대폰 본인 인증이 되지 않았습니다! 🙂`));
        dispatch(showAlertModal(true));
      }
    }
  };

  // 취소 버튼 핸들러
  const handleCloseBtn = async () => {
    // 취소 버튼을 클릭하면 마이페이지로 이동
    navigate('/mypage');
    // 모든 버튼 SWITCHOFF
    dispatch(getBtnSwitchState({ profileEdit: false, conchinCertification: false }))
  };

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
              <select 
                className='short'
                onChange={inputDropdownValueHandler('birthYear')}
              >
                <option> 년 (4자) </option>
                {yearList.map((year, idx) => {
                  return <option value={year}> {year} </option>;
                })}
              </select>
              <select
                className='short'
                onChange={inputDropdownValueHandler('birthMonth')}
              >
                <option> 월 </option>
                {monthList.map((month, idx) => {
                  return <option value={month}> {month} </option>;
                })}
              </select>
              <select
                className='short'
                onChange={inputDropdownValueHandler('birthDate')}
              >
                <option> 일 </option>
                {dateList.map((date, idx) => {
                  return <option value={date}> {date} </option>;
                })}
              </select>
            </div>
          </div>
          <div id='genderBox'>
            <div id='titleWrapper'>
              <p className='title'>성별</p>
            </div>
            <span className='gender'>성별</span>
            <select
              className='gender'
              onChange={inputDropdownValueHandler('gender')}
            >
              {/* <select className='gender'> */}
              <option> 성별 </option>
              <option value='남자'> 남자 </option>
              <option value='여자'> 여자 </option>
            </select>
          </div>
          {/* 휴대폰 인증 Box */}
          <div id='phoneBox'>
            <div id='titleWrapper'>
              <p className='title'>휴대전화</p>
            </div>
            <div id='region'>대한민국 +82</div>
            <div className='certificationWrapper'>
              <div className='recieveWrapper'>
                <input
                  className='number'
                  placeholder='숫자만 입력해주세요. ex) 01077776666'
                  onChange={inputValueHandler('phoneNumber')}
                />
                <img
                  className={
                    checkImg && isPhoneCertificatePass ? 'checkImg' : 'hidden'
                  }
                  src={check}
                />
                {/* 휴대폰 인증번호 받기 버튼 */}
                <button
                  className='receiveBtn'
                  onClick={() => {
                    handleGetConfirmNumber();
                  }}
                >
                  인증번호 받기
                </button>
              </div>
            </div>
          </div>
          <div id='btnBox'>
            <div id='btnWrapper'>
              <button
                className='completeBtn'
                onClick={() => {
                  handleCompleteCertificateBtn();
                }}
              >
                인증 완료
              </button>
              <button
                className='cancelBtn'
                onClick={() => {
                  handleCloseBtn();
                }}
              >
                취소
              </button>
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
