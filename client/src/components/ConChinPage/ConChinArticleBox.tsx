/* Config import */
import { REACT_APP_API_URL } from '../../config';
/* CSS import */
import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import ConChinArticleOrderBox from './ConChinArticleOrderBox';
import ConChinArticlePagination from './ConChinArticlePagination';
/* Store import */
import { RootState } from '../../index';
import { setAllArticles } from '../../store/ConChinSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinArticleBox() {
  const { target } = useSelector((state: RootState) => state.main);
  const { articleOrder, allArticles } = useSelector(
    (state: RootState) => state.conChin,
  );
  const dispatch = useDispatch();

  return (
    <div
      id={
        Object.keys(target).length === 0
          ? 'conChinArticleBox'
          : 'conChinArticleBoxChosen'
      }
    >
      <ConChinArticleOrderBox />
      <div
        id={
          Object.keys(target).length === 0 ? 'articleBox' : 'articleBoxChosen'
        }
      >
        {/*게시물 맵핑 */}
        <div id={Object.keys(target).length === 0 ? 'box' : 'boxChosen'}>
          {allArticles.map(article => {
            return (
              <ul
                className='article'
                key={article.id}
                onClick={() => {
                  console.log(article.id);
                }}
              >
                <img
                  className='thumbNail'
                  src={
                    article.image !== null
                      ? `${REACT_APP_API_URL}/uploads/${article.image}`
                      : defaultImage
                  }
                ></img>
                <div id='conChinmemberBoxWrapper'>
                  <div className='memberBox'>
                    <img className='icon' src={groupImage} />
                    <div className='count'>
                      {article.member_count}/{article.total_member}
                    </div>
                  </div>
                </div>
                <div className='title'>
                  <img className='icon' src={viewImage} />
                  <p className='count'>{article.view}</p>
                  <p className='date'>21.01.14</p>
                  {/* {article.createdAt} */}
                  <p className='text'>{article.content}</p>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
      {/*게시물 맵핑 */}
      <div
        id={
          Object.keys(target).length === 0
            ? 'paginationWrapper'
            : 'paginationWrapperChosen'
        }
      >
        <ConChinArticlePagination />
      </div>
    </div>
  );
}
export default ConChinArticleBox;
