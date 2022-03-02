/* CSS import */
import ticket from '../../../images/resignTicket.png';
/* Store import */
import { logout, loginCheck } from '../../../store/AuthSlice';
import {
  setTarget,
  setTargetIdx,
  setOrder,
  setAllConcerts,
  setIsRendering,
  setIsOrderClicked,
  setPosterLoading,
  setDetail,
  setMainLoading,
} from '../../../store/MainSlice';
import { setMainTotalComments } from '../../../store/MainSlice';

import {
  setPageAllComments,
  setTotalNum,
  setPageNum,
} from '../../../store/ConcertCommentSlice';
import {
  setAlarm,
  setEmailClick,
  setSmsClick,
} from '../../../store/ConcertAlarmSlice';
import {
  showMyDropDown,
  showLoginModal,
  showConcertModal,
  showMyProfileResignMembershipModal,
  insertAlertText,
  insertBtnText,
  showSuccessModal,
  showAlertModal,
} from '../../../store/ModalSlice';
/* Library import */
import axios from 'axios';
import { RootState } from '../../../index';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function MyProfileResignMembershipModal() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* useSelector */
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { target } = useSelector((state: RootState) => state.main);
  const { pageNum } = useSelector((state: RootState) => state.concertComments);

  /* 지역상태 - useState */

  /* useEffect */
  // 회원탈퇴 모달 상태

  /* handler 함수 (기능별 정렬) */
  // 회원탈퇴 버튼
  const handleResignMembership = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/me`,
        { withCredentials: true },
      );
      // Axios 결과 로그아웃 상태시 MainPage Redirect
      if (response.data.message === 'Unauthorized userInfo!')
        return dispatch(loginCheck(false));

      // ------------------- 주의!!! 수정이 필요!
      dispatch(showMyProfileResignMembershipModal(false));

      dispatch(insertAlertText('GoodBye! 🙂'));
      dispatch(insertBtnText('확인'));
      dispatch(showAlertModal(true));
      // ------------------- 주의!!! 수정이 필요!
      /* 로그인 상태 변경 & main 페이지로 이동 */
      dispatch(logout());
      goHomeHandler();
    } catch (error) {
      // console.log(error)
    }
  };

  // 로그아웃 후 메인페이지 리다이렉트 핸들러
  const goHomeHandler = () => {
    dispatch(setMainLoading(false));
    /* 메인페이지 상태 초기화 */
    dispatch(setIsRendering(false));
    dispatch(setOrder('view'));
    getAllConcerts('view');

    dispatch(setAlarm({}));
    dispatch(setEmailClick(false));
    dispatch(setSmsClick(false));
    /* 켜져있는 모달창 모두 종료 */
    dispatch(showConcertModal(false)); // concertPage 모달창
    dispatch(showLoginModal(false));
    /* 홈으로 이동 */
    setTimeout(() => {
      navigate('/main');
      dispatch(setMainLoading(true));
    }, 500);
  };
  /*전체 콘서트 받아오기 */
  const getAllConcerts = async (clickValue: string) => {
    try {
      /* 포스터 로딩 상태 세팅 */
      dispatch(setPosterLoading(false));
      dispatch(setIsOrderClicked(false));
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=${clickValue}`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & target,targetIdx,pageNum 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setTarget(response.data.data.concertInfo[0]));
        dispatch(setTargetIdx(0));
        dispatch(setPageNum(1));
        /* 상세 콘서트 받아오기 & 렌더링 상태 변경 */
        dispatch(setIsRendering(true));
        dispatch(setPosterLoading(true));
        dispatch(setIsOrderClicked(true));
        getDetailInfo(response.data.data.concertInfo[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 상세 콘서트 받아오기 */
  const getDetailInfo = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${id}`,
        { withCredentials: true },
      );
      if (response.data.data) {
        /* 서버 응답값이 있다면 detail(상세정보) 갱신 */
        dispatch(setDetail(response.data.data.concertInfo));
        getAllComments(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 모든 댓글 가져오기 함수 */
  const getAllComments = async (id: number) => {
    try {
      if (target) {
        /* response 변수에 서버 응답결과를 담는다 */
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/concert/${id}/comment?pageNum=${pageNum}`,
          { withCredentials: true },
        );
        /* 서버의 응답결과에 유효한 값이 담겨있다면 댓글 조회 성공*/
        if (response.data) {
          /* 모든 페이지수 & 모든 댓글목록을 전역 상태에 담는다 */
          dispatch(setTotalNum(response.data.data.totalPage));
          dispatch(setPageAllComments(response.data.data.concertCommentInfo));
          dispatch(setMainTotalComments(response.data.data.totalComment));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='myProfileResignMembershipModal'>
      <div
        id='bg'
        onClick={() => {
          dispatch(showMyProfileResignMembershipModal(false));
        }}
      />
      <div id='modalBox'>
        <div id='modal'>
          <div id='titleWrapper'>
            <p id='title'>회원탈퇴</p>
          </div>
          <div id='imgBox'>
            <div id='imgWrapper'>
              <img className='img' src={ticket} alt='ticket' />
            </div>
          </div>
          <div id='explainWrapper'>
            <p className='explain'>
              {userInfo.username} (님)
              <br />
              정말 탈퇴하시겠습니까?
            </p>
          </div>
          <div id='resignBtnWrapper'>
            <button
              className='cancleBtn'
              onClick={() => {
                dispatch(showMyProfileResignMembershipModal(false));
              }}
            >
              취소
            </button>
            <button
              className='resignBtn'
              onClick={() => {
                handleResignMembership();
              }}
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfileResignMembershipModal;
