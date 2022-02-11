/* Store import */
import { RootState } from '../../index';
import { loginCheck } from '../../store/AuthSlice';
import { getArticleInfo, getMyArticleTotalPage, getMyArticleCommentCurrentPage } from '../../store/MySlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function MyArticlePagination() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articleInfo, myArticleTotalPage, myArticleCommentCurrentPage } = useSelector((state: RootState) => state.my);

  let pageArr: number[] = [];
  for (let i = 1; i <= myArticleTotalPage; i++) {
    pageArr.push(i);
  }

  // 내가 쓴 게시물 페이지를 클릭헀을 때, 다음을 실행한다
  const handlePageClick = async (pageNum: number) => {

    /* 내가 쓴 게시물 axios 테스트 */
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/myarticle?pageNum=${pageNum}`,
      { withCredentials: true },
    );
    // Axios 결과 로그아웃 상태시 MainPage Redirect
    if(response.data.message === 'Unauthorized userInfo!') return dispatch(loginCheck(false));

    dispatch(getArticleInfo(response.data.data))
    dispatch(getMyArticleTotalPage(response.data.data.totalPage))
    /* 내가 쓴 게시물 axios 테스트 */
    
    // (나의 게시글) 현재 선택된 페이지 업데이트
    dispatch(getMyArticleCommentCurrentPage(pageNum))
  } 

  return (
    <div id='pagination'>
      {
        pageArr.length > 0
        ? pageArr.map((el: number) => {
          return (
          <ul className={ myArticleCommentCurrentPage === el ? 'pageChosen' : 'page' } onClick={() => handlePageClick(el)}>
            <p className='text'> {el} </p>
          </ul>
          )
        })
        : null
      }
    </div>
  );
}

export default MyArticlePagination;