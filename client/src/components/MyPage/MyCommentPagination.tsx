
import axios from 'axios';

import { RootState } from '../../index';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getMyConcertCommentInfo, getMyConcertCommentTotalPage, getMyArticleCommentInfo, getMyArticleCommentTotalPage } from '../../store/MySlice';

function MyCommentPagination() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { concertCommentInfo, myConcertCommentTotalPage, myArticleCommentTotalPage, commentBtnType } = useSelector((state: RootState) => state.my);

  let concertPageArr: number[] = [];
  for (let i = 1; i <= myConcertCommentTotalPage; i++) {
    concertPageArr.push(i);
  }

  let articlePageArr: number[] = [];
  for (let i = 1; i <= myArticleCommentTotalPage; i++) {
    articlePageArr.push(i);
  }

  // 내가 쓴 (콘서트) 게시물 페이지를 클릭헀을 때, 다음을 실행한다
  const handleConcertPageClick = async (pageNum: number) => {
    
    /* 내가 쓴 댓글(콘서트 게시물) axios 테스트 */
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=${pageNum}`,
      { withCredentials: true },
      );
      
    dispatch(getMyConcertCommentInfo(response.data.data))
    dispatch(getMyConcertCommentTotalPage(response.data.data.totalPage))
    /* 내가 쓴 댓글(콘서트 게시물) axios 테스트 */
  } 

  // 내가 쓴 (콘친) 게시물 페이지를 클릭헀을 때, 다음을 실행한다
  const handleArticlePageClick = async (pageNum: number) => {
    
    /* 내가 쓴 댓글(콘친 게시물) axios 테스트 */
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/mycomment?pageNum=${pageNum}&comment_type=article`,
      { withCredentials: true },
      );
      
    dispatch(getMyArticleCommentInfo(response.data.data))
    dispatch(getMyArticleCommentTotalPage(response.data.data.totalPage))
    /* 내가 쓴 댓글(콘친 게시물) axios 테스트 */
  } 

  return (
    <div id='pagination'>
      {/* 어떤 버튼 (콘서트 / 콘친 게시물)이 눌림에 따라 페이지수가 달라진다 */}
      { commentBtnType === '콘서트'
        ?
          (concertPageArr.length > 0
          ? concertPageArr.map((el: number) => {
            return (
            <ul className='page' onClick={() => handleConcertPageClick(el)}>
              <p className='text'> {el} </p>
            </ul>
            )
          })
          : null)
        : (articlePageArr.length > 0
          ? articlePageArr.map((el: number) => {
            return (
            <ul className='page' onClick={() => handleArticlePageClick(el)}>
              <p className='text'> {el} </p>
            </ul>
            )
          })
          : null)
      }
    </div>
  );
}

export default MyCommentPagination;
