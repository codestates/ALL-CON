import MyProfileBox from '../components/MyPage/MyProfileBox';
import Footer from '../components/Footer';
/* CSS import */
import resignArrow from '../images/resignArrow.png';
import check from '../images/check.png';
/* Store import */
import { RootState } from '../index';
import { logout, getUserInfo } from '../store/AuthSlice';
import { showAlertModal, insertAlertText, insertBtnText, showSuccessModal, showMyProfileResignMembershipModal } from '../store/ModalSlice';
import { setMyIntroductionState, getBtnSwitchState } from '../store/MySlice';
/* Library import */
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function MyEditPage() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { myIntroduction } = useSelector((state: RootState) => state.my);
  
  /* 지역상태 - useState */

  // 변경할 유저정보 상태 선언
  interface ChangeUserInfo {
    introduction: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  // 주의: 초기값을 바꿔줘야한다!
  const [changeUserInfo, setChangeUserInfo] = useState<ChangeUserInfo>({
    introduction: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

   // 닉네임 중복 여부 판단 상태
   const [isPassDuplication, setIsPassDuplication] = useState<boolean>(false);
   // 중복확인 버튼 클릭 유무 판단 상태
   const [duplicationBtn, setDuplicationBtn] = useState<boolean>(false);

   // 유효성 검사 상태
   const [nameErr, setNameErr] = useState<boolean>(true);
   const [passwordErr, setPasswordErr] = useState<boolean>(false);
   const [confirmPasswordErr, setConfirmPasswordErr] = useState<boolean>(false);
   
   // 로그인 유형에 따른 비밀번호 변경 및 비밀번호 확인 
   const [activationPassword, setActivationPasswrd] = useState<boolean>(true); 

  /* useEffect */
  // user가 oauth로 로그인 했으면 비밀번호 변경, 비밀번호 확인란은 비활성화된다
  useEffect(() => {
    // allcon으로 회원가입을 하지 않았다면,
    if(userInfo.sign_method !== 'allcon') {
      setActivationPasswrd(false);
    }
    else setActivationPasswrd(true);
  }, [])

  /* handler 함수 (기능별 정렬) */

  // 인풋 입력 핸들러
  const inputValueHandler = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {

    if(key === 'username') setDuplicationBtn(false)

    const info = { ...changeUserInfo, [key]: e.target.value };
    setChangeUserInfo(info);
    if(key === 'username') nameErrCheck(e.target.value)
    else if(key === 'password') passwordErrCheck(e.target.value)
    else if(key === 'confirmPassword') confirmPasswordErrCheck(changeUserInfo.password, e.target.value)
  };

  // 입력값 유효성 검사 핸들러
  const isAllValid = (changeUserInfo: ChangeUserInfo): boolean => {
    // allcon으로 회원가입한 경우, 닉네임, 비밀번호 변경, 비밀번호 확인을 check
    if(activationPassword) {
      if(changeUserInfo.username === '') return nameErr && passwordErr && confirmPasswordErr ? true : false;
      // 닉네임 유효성, 닉네임 중복여부, 비밀번호 유효성, 비밀번호 확인 유효성
      else return nameErr && isPassDuplication && passwordErr && confirmPasswordErr ? true : false;
    } 
    // 구글 혹은 카카오톡으로 로그인 한 경우, 다음을 실행한다
    else {
      if(changeUserInfo.username === '') return nameErr    
      else return nameErr && isPassDuplication ? true : false;
    }
  };

  // 입력값 초기화 핸들러
  const resetInput = () => {
    setChangeUserInfo({
      introduction: '',
      username: `${userInfo.username}`,
      password: '',
      confirmPassword: ''
    });
     
    setNameErr(false);
    setIsPassDuplication(false);
    setPasswordErr(false);
    setConfirmPasswordErr(false);
  };

  // 닉네임 유효성검사 핸들러
  const nameErrCheck = (username: string) => {
    // 닉네임 중뵥여부 검사 초기화 (false)
    setIsPassDuplication(false);
    // 닉네임 유효성검사 정규식
    const usernameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
    if (username === ''){
      console.log('여기인가?#1', username)
      setNameErr(false);
      return
    }
    // 닉네임 유효성검사를 통과한 경우, nameErr 상태를 true로 변경
    if (usernameExp.test(username)){
      console.log('여기인가?#2', username)
      setNameErr(true);
      return 
    }
    console.log('여기인가?#3', username)
    setNameErr(false);
    return
  };

  // 비밀번호 유효성검사 핸들러
  const passwordErrCheck = (password: string) => {
    const passwordExp = /^[a-zA-z0-9]{6,12}$/;
    if (password === '') {
      setPasswordErr(false);
      return
    }
    // 비밀번호 유효성검사를 통과한 경우, passwordErr 상태를 true로 변경
    if (passwordExp.test(password)) {
      setPasswordErr(true);
      return
    }
    setPasswordErr(false);
    return
  };

  // 비밀번호 확인 유효성검사 핸들러
  const confirmPasswordErrCheck = (password: string, confirmPassword: string) => {
    if (password === '') {
      setConfirmPasswordErr(false);
      return
    }
    // 비밀번호 확인 유효성검사를 통과한 경우, confirmPasswordErr 상태를 true로 변경
    if (password === confirmPassword) {
      setConfirmPasswordErr(true);
      return 
    }
    setConfirmPasswordErr(false);
    return
  };

  // 닉네임 중복확인 핸들러
  const duplicationHandler = async () => {
    try {
      setDuplicationBtn(true)
      setActivationPasswrd(true)

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/username`,
        { username: changeUserInfo.username || userInfo.username },
        { withCredentials: true }
      );

      console.log('----------------------------------------:', response.data.data)

      // 중복되지 않은 닉네임이라면, 다음을 실행한다
      if(response.data.state) {
        // 닉네임 중복 판단 여부를 true로 설정
        dispatch(insertAlertText(`사용가능한 닉네임입니다! 🙂`));
        dispatch(insertBtnText('확인'));
        dispatch(showSuccessModal(true));

        setIsPassDuplication(true)
      }
      // 중복된 닉네임이라면, 다음을 실행한다
      else {
        // 닉네임 중복 판단 여부를 false로 설정
        setIsPassDuplication(false);
        dispatch(insertAlertText(`이미 사용중인 닉네임입니다! 🙂`));
        dispatch(showAlertModal(true));

        setIsPassDuplication(false)
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 중복확인 엔터... (주의! 좀더 좋은 방법이 있을꺼야!)
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') duplicationHandler()
  }

  // [PATCH] 변경 완료 버튼 핸들러
  const changeUserProfileHandler = async () => {
    try {
      let finalIntroduction = myIntroduction.replace(' ', '')
      // 만약 변경된 유저의 정보가 모두 유효하다면, 다음을 실행한다
      if (isAllValid(changeUserInfo)) {
            const response = await axios.patch(
              `${process.env.REACT_APP_API_URL}/user/me`,
              { 
                introduction: finalIntroduction,
                username: changeUserInfo.username || userInfo.username, 
                password: changeUserInfo.password 
              },
              { withCredentials: true }
            );
            // 입력값들을 reset
            resetInput();

            dispatch(insertAlertText(`(${userInfo.username})님의 프로필이 변경되었습니다! 🙂`));
            dispatch(insertBtnText('확인'));
            dispatch(showSuccessModal(true));

            // userInfo 상태 업데이트
            dispatch(getUserInfo(response.data.data));
            // 프로필 수정 / 콘친 인증 버튼 비활성화
            dispatch(getBtnSwitchState({ profileEdit: false, conchinCertification: false }))
            // 자기소개는 비활성화로 전환
            dispatch(setMyIntroductionState(false))
            // 마이페이지로 이동
            navigate('/mypage')
          } 
        // 닉네임란이 비어있을 경우, 다음을 실행한다
        else if(changeUserInfo.username === '' || !nameErr){
          dispatch(insertAlertText(`닉네임을 정확하게 입력해주세요! 🙂`));
          dispatch(showAlertModal(true));
        } 
        // 닉네임 중복확인이 되어있지 않을 경우, 다음을 실행한다
        else if(!isPassDuplication) {
          dispatch(insertAlertText(`닉네임 중복 여부를 확인해주세요! 🙂`));
          dispatch(showAlertModal(true));
        }
        // 비밀번호가 비어있거나 유효성 검사에 통과하지 못한 경우, 다음을 실행한다
        else if(changeUserInfo.password === '' || !passwordErr) {
          dispatch(insertAlertText(`비밀번호를 정확하게 입력해주세요! 🙂`));
          dispatch(showAlertModal(true));
        }
        // 비밀번호 확인이 비어있거나 유효성 검사에 통과하지 못한 경우, 다음을 실행한다
        else if(changeUserInfo.confirmPassword === '' || !confirmPasswordErr) {
          dispatch(insertAlertText(`비밀번호가 일치하지 않습니다! 🙂`));
          dispatch(showAlertModal(true));
        }
    } catch (err) {
      const error = err as AxiosError;
      if(error.response?.status === 400) dispatch(insertAlertText('잘못된 요청입니다! 😖'));
      else dispatch(insertAlertText('Server Error! 😖'));
      dispatch(showAlertModal(true));
    }
  };

  // 취소 버튼 핸들러
  const handleCloseBtn = async () => {
    // 마이페이지로 이동
    navigate('/mypage')
    // 자기소개는 비활성화로 전환
    dispatch(setMyIntroductionState(false))
    // 모든 버튼 SWITCH OFF
    dispatch(getBtnSwitchState({ profileEdit: false, conchinCertification: false }))
  }

  return (
    <div id='myEditPage'>
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
            {/* 유저 이메일 */}
            <div id='email'> {`${userInfo.email}`} </div>
          </div>
          <div id='nickNameWrapper'>
            <div id='titleWrapper'>
              <p className='title'>닉네임</p>
            </div>
            <div id='nickNameBox'>
              <input type='text' id='nickName' placeholder={userInfo.username} value={changeUserInfo.username} onChange={inputValueHandler('username')} onKeyPress={onKeyPress}/>
              <img
                  // id={isPassDuplication ? 'checkImg' : 'hidden'}
                  id='checkImg'
                  src={check}
                />
                {/* 중복확인 버튼 */}
              <div id='duplicationCheck' onClick={duplicationHandler}> 중복확인 </div>
            </div>
            {changeUserInfo.username === '' || changeUserInfo.username === userInfo.username
              ? null
              : nameErr
                ? duplicationBtn
                  ? isPassDuplication
                    ? <div id='nicknamePass'>사용가능한 닉네임입니다.</div> 
                    : <div id='nicknameErr'>이미 사용중인 닉네임입니다.</div> 
                  : <div id='nicknameErr'>닉네임 중복확인을 눌러주세요.</div> 
                : <div id='nicknameErr'>사용할 수 없는 닉네임입니다.</div>
            }
          </div>
          <div id='resetBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 변경</p>
            </div>
            {
              activationPassword
              ? <input type='password' placeholder='비밀번호를 입력해주세요.' className='reset' value={changeUserInfo.password} onChange={inputValueHandler('password')} />
              : <input type='password' className='reset' placeholder='비밀번호를 변경할 수 없습니다.' disabled />
            }
            {passwordErr
              ? <div id='passwordPass'> 사용가능한 비밀번호입니다. </div>
              : changeUserInfo.password === '' 
                ? null
                : <div id='passwordErr'> 비밀번호는 영문, 숫자만 가능하며 6~12자리로 입력해야 합니다. </div>
            }
          </div>
          <div id='confirmBox'>
            <div id='titleWrapper'>
              <p className='title'>비밀번호 확인</p>
            </div>
            {
              activationPassword
              ? <input type='password' placeholder='비밀번호를 확인해주세요.' className='confirm' value={changeUserInfo.confirmPassword} onChange={inputValueHandler('confirmPassword')} />
              : <input type='password' className='confirm' placeholder='비밀번호를 변경할 수 없습니다.' disabled />
            }
            {confirmPasswordErr
              ? <div id='confirmPasswordPass'> 비밀번호가 일치합니다. </div>
              : changeUserInfo.confirmPassword === '' 
                ? null
                : <div id='confirmPasswordErr'> 비밀번호가 일치하지 않습니다. </div>
            }
          </div>
          <div id='btnBox'>
            <div id='btnWrapper'>
              <button className='completeBtn' onClick={changeUserProfileHandler}>변경 완료</button>
              <button className='cancelBtn' onClick={() => {handleCloseBtn()}}>취소</button>
            </div>
          </div>
        </div>
        {/* 회원탈퇴 버튼 */}
        <div id='resignBtn' onClick={() => {dispatch(showMyProfileResignMembershipModal(true))}}>
          <div id='resignBtnMessage'>ALL-CON을 더 이상 이용하지 않는다면 <b>&nbsp;회원탈퇴 바로가기</b></div>
          <img id='resignArrowImg' src={resignArrow}/>
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

export default MyEditPage;
