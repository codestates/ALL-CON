/* Config import */
/* CSS import */
/* Store import */
import { getMyConcertCommentInfo, getMyConcertCommentTotalPage, getMyArticleCommentInfo, getMyArticleCommentTotalPage, getMyConcertCommentCurrentPage, getMyArticleCommentCurrentPage } from '../../store/MySlice';
/* Library import */
import { RootState } from '../../index';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/* Props 선언 */
interface MyCommentPaginationProps {
  deactivateEditTextarea(key?: string): void
}


function MyCommentPagination( { deactivateEditTextarea }: MyCommentPaginationProps ) {
  /* dispatch / navigate */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  /* useSelector */
  const { myConcertCommentTotalPage, myArticleCommentTotalPage, commentBtnType, myConcertCommentCurrentPage, myArticleCommentCurrentPage } = useSelector((state: RootState) => state.my);

  /* 지역상태 - useState */
  let concertPageArr: number[] = [];
  for (let i = 1; i <= myConcertCommentTotalPage; i++) {
    concertPageArr.push(i);
  }

  let articlePageArr: number[] = [];
  for (let i = 1; i <= myArticleCommentTotalPage; i++) {
    articlePageArr.push(i);
  }

  /* useEffect */

    /* handler 함수 (기능별 정렬) */
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
    // 현재 (내가 쓴 콘서트 댓글) 페이지 업데이트
    dispatch(getMyConcertCommentCurrentPage(pageNum))
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
    // 현재 (내가 쓴 콘서트 댓글) 페이지 업데이트
    dispatch(getMyArticleCommentCurrentPage(pageNum))
  } 

  return (
    <div id='pagination'>
      {/* 어떤 버튼 (콘서트 / 콘친 게시물)이 눌림에 따라 페이지수가 달라진다 */}
      { commentBtnType === '콘서트'
        ?
          (concertPageArr.length > 0
          ? concertPageArr.map((el: number) => {
            return (
            <ul className={ el === myConcertCommentCurrentPage ? 'pageChosen' : 'page' } 
              onClick={() => {
              handleConcertPageClick(el)
              deactivateEditTextarea('콘서트')
              }
            }>
              <p className='text'> {el} </p>
            </ul>
            )
          })
          : null)
        : (articlePageArr.length > 0
          ? articlePageArr.map((el: number) => {
            return (
            <ul className={ el === myArticleCommentCurrentPage ? 'pageChosen' : 'page' } 
                onClick={() => {
                  handleArticlePageClick(el)
                  deactivateEditTextarea('콘친')
                }
              }>
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
