import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import MyArticlePagination from './MyArticlePagination';

import { RootState } from '../../index';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function MyArticleBox() {
  
  const { articleInfo, myArticleTotalPage } = useSelector((state: RootState) => state.my);

  console.log('-------', articleInfo)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div id='myArticleBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 게시물</p>
      </div>
      <div id='articleWrapper'>
        <div id='articleBox'>
          <div id='box'>
            { 
              Array.isArray(articleInfo)
              ? articleInfo.map((el: any) => {
                return (
                <ul className='article'>
                  <img
                  className='thumbNail'
                  src={el.image}
                  // alt='defaultImage'
                  ></img>
                  <div id='myMemberBoxWrapper'>
                    <div className='memberBox'>
                      <img className='icon' src={groupImage} alt='groupImage' />
                      <div className='count'> {el.member_count}/{el.total_member} </div>
                      </div>
                      </div>
                      <div className='title'>
                        <img className='icon' src={viewImage} alt='viewImage' />
                        <p className='count'>{el.view}</p>
                        <p className='date'>{el.updatedAt}</p>
                        <p className='text'>{el.content}</p>
                   </div>
                  </ul>)
                  })
              : null
            }
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