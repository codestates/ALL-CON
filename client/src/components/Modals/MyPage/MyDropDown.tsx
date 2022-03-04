/* Store import */
import { RootState } from '../../../index';
import {
  setPageAllComments,
  setTotalNum,
  setPageNum,
} from '../../../store/ConcertCommentSlice';
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
  setTargetArticle,
  setArticleRendered,
  setArticleCurPage,
} from '../../../store/ConChinSlice';
import { loginCheck, logout, getUserInfo } from '../../../store/AuthSlice';
import {
  setAlarm,
  setEmailClick,
  setSmsClick,
} from '../../../store/ConcertAlarmSlice';
import {
  showMyDropDown,
  showLoginModal,
  showConcertModal,
  showAlertModal,
  insertAlertText,
} from '../../../store/ModalSlice';

import { setIsLoadingState } from '../../../store/MySlice';

/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function MyDropDown() {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* useSelector */
  const { target } = useSelector((state: RootState) => state.main);
  const { pageNum } = useSelector((state: RootState) => state.concertComments);

  const { scrollCount } = useSelector((state: RootState) => state.header);

  /* 지역상태 - useState */
  /* useEffect */

  /* handler 함수 (기능별 정렬) */
  // 로그아웃 후 메인페이지 리다이렉트 핸들러
  const goHomeHandler = () => {
    dispatch(setMainLoading(false));
    /* 메인페이지 상태 초기화 */
    dispatch(setIsRendering(false));
    dispatch(setOrder('view'));
    // getAllConcerts('view');

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

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        { withCredentials: true },
      );
      /* 로그인 상태 변경 & main 페이지로 이동 & 로그아웃 성공 모달 생성 */
      dispatch(loginCheck(false));
      dispatch(logout());
      dispatch(getUserInfo({}));
      dispatch(showAlertModal(true));
      dispatch(insertAlertText(`로그아웃 되었습니다!`));
      goHomeHandler();
    } catch (err) {
      // console.log(err);
      dispatch(showAlertModal(true));
      dispatch(insertAlertText(`로그아웃에 실패했습니다!`));
    }
  };

  // 이동 시 타겟 초기화 핸들러
  const resetHandler = async () => {
    /* Common */
    dispatch(setTarget({}));
    /* MainPage */
    // dispatch(setTargetIdx(0));
    // dispatch(setPageNum(1));
    // dispatch(setOrder('view'));
    /* ConcertPage */
    dispatch(showConcertModal(false));
    /* ConchinPage */
    dispatch(setTargetArticle({}));
    dispatch(setArticleRendered(false));
    dispatch(setArticleCurPage(1));
  };

  // 마이페이지 버튼을 누르면, 다음이 실행된다
  const handleMypageBtn = async () => {
    try {
      // isLoading 초기상태 세팅
      dispatch(
        setIsLoadingState({
          myArticle: false,
          myConcertComment: false,
          myArticleComment: false,
        }),
      );
      // 콘서트 페이지에서 콘서트를 선택한 후 마이페이지로 넘어갈 때, 지도 API close 해주는 함수
      resetHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id='myDropModal'>
      <div id='bg' onClick={() => dispatch(dispatch(showMyDropDown(false)))} />
      <div
        id={scrollCount < 0.5 ? 'modalBox' : 'downedModalBox'}
        onClick={() => dispatch(dispatch(showMyDropDown(false)))}
      >
        <div id={scrollCount < 0.5 ? 'modal' : 'downedModal'}>
          <div id='myMenuWrapper'>
            <Link to='/mypage' className='menus' onClick={handleMypageBtn}>
              <p>마이페이지</p>
            </Link>
            <Link to='/main' className='menus' onClick={logoutHandler}>
              <p>로그아웃</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDropDown;
