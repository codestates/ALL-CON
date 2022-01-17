import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import MyArticlePagination from './MyArticlePagination';

import axios from 'axios';

import { RootState } from '../../index';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setTarget, setAllConcerts } from '../../store/MainSlice';
import {
  setTargetArticle,
  setTargetArticlesUserInfo,
} from '../../store/ConChinSlice';

function MyArticleBox() {
  const { articleInfo } = useSelector((state: RootState) => state.my);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 마이페이지 - 나의 게시물 중 한 게시물을 선택하면, 다음이 실행된다
  const handleArticleSelected = async (
    id: number,
    concert_id: number,
    user_id: number,
  ) => {
    // 선택한 게시물에 해당하는 콘서트에 대한 정보를 불러온다
    const responseConcert = await axios.get(
      `${process.env.REACT_APP_API_URL}/concert/${concert_id}`,
      { withCredentials: true },
    );

    // 선택한 게시물에 대한 정보를 불러온다
    const responseArticle = await axios.get(
      `${process.env.REACT_APP_API_URL}/concert/${concert_id}/article/${id}`,
      { withCredentials: true },
    );

    // 선택한 게시물 작성자 유저정보를 불러온다 */

    const responseUser = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/other/${user_id}`,
      { withCredentials: true },
    );

    // 현재 선택한 콘서트 업데이트 (target)
    console.log(responseConcert.data.data);
    dispatch(setTarget(responseConcert.data.data.concertInfo));

    // 현재 선택한 유저정보 업데이트 (target)
    dispatch(setTargetArticlesUserInfo(responseUser.data.data.userInfo));

    // 현재 선택한 게시물 업데이트 (target)
    console.log(responseArticle.data.data);
    dispatch(setTargetArticle(responseArticle.data.data.articleInfo));
    navigate('/conchin');
  };

  return (
    <div id='myArticleBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 게시물</p>
      </div>
      <div id='articleWrapper'>
        <div id='articleBox'>
          <div id='box'>
            {Array.isArray(articleInfo)
              ? articleInfo.map((el: any) => {
                  return (
                    // 마이페이지, 내가 작성한 게시물에서 "특정 게시물"을 선택
                    <ul
                      className='article'
                      onClick={() =>
                        handleArticleSelected(el.id, el.concert_id, el.user_id)
                      }
                    >
                      <img
                        className='thumbNail'
                        src={el.image}
                        // alt='defaultImage'
                      ></img>
                      <div id='myMemberBoxWrapper'>
                        <div className='memberBox'>
                          <img
                            className='icon'
                            src={groupImage}
                            alt='groupImage'
                          />
                          <div className='count'>
                            {' '}
                            {el.member_count}/{el.total_member}{' '}
                          </div>
                        </div>
                      </div>
                      <div className='title'>
                        <img className='icon' src={viewImage} alt='viewImage' />
                        <p className='count'>{el.view}</p>
                        <p className='date'>{el.updatedAt}</p>
                        <p className='text'>{el.content}</p>
                      </div>
                    </ul>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <div id='paginationWrapper'>
        <MyArticlePagination />
      </div>
    </div>
  );
}

export default MyArticleBox;
