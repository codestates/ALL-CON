/* CSS import */
import shield from '../../images/shield.png';
/* Component import */
import ConChinWritingModal from '../Modals/ConChinPage/ConChinWritingModal';
/* Store import */
import { RootState } from '../../index';
import { logout, getUserInfo } from '../../store/AuthSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinFindBox() {

  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  
  /* 지역상태 - useState */
  const [writeModal, setWriteModal] = useState<boolean>(false)

  /* useEffect */

  /* handler 함수 (기능별 정렬) */
  // 글쓰기 버튼 클릭시
  const handleWriteModal = async () => {
    console.log('--- 글쓰기 모달 확인 ---', userInfo.role)

    // 만약 유저가 일반회원(role=2)이라면, (가칭) 인증하러가기 모달을 띄어준다
    if(userInfo.role === 3) alert('ALL-CON\n 게시글을 작성하고 싶으면 콘친 인증해주세요! 😖') 
    // 이외의 경우, 글작성 모달을 띄어준다
    else setWriteModal(true)
  }

  // 게시글 모달 닫기
  const handleCloseWriteModal = async () => {
    setWriteModal(false)
  }

  return (
    <div id='conChinFindBox'>
      {writeModal
        ? <ConChinWritingModal handleCloseWriteModal={handleCloseWriteModal} />
        : null
      }
      <div className='title'>
        <div className='textWrapper'>
          <span className='text'>콘친 찾기</span>
        </div>
      </div>
      <div className='btnWrapper'>
        <button className='btn' onClick={() => {handleWriteModal()}}>
          <img className='img' src={shield} />글 쓰기
        </button>
      </div>
    </div>
  );
}
export default ConChinFindBox;
