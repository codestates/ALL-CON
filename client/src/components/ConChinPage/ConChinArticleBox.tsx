/* CSS import */
import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import ConChinArticleOrderBox from './ConChinArticleOrderBox';
import ConChinArticlePagination from './ConChinArticlePagination';
/* Store import */
import { RootState } from '../../index';
import { setAllArticles } from '../../store/ConChinSlice';
import { setTarget } from '../../store/MainSlice';
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

  useEffect(() => {}, [allArticles]);
  return (
    <div id='conChinArticleBox'>
      <ConChinArticleOrderBox />
      {allArticles !== undefined && allArticles.length > 0 ? (
        <div
          id={
            Object.keys(target).length === 0 ? 'articleBox' : 'articleBoxChosen'
          }
        >
          {/*게시물 맵핑, 타겟이 없고 게시물만 있을 때 */}
          {Object.keys(allArticles).length > 0 &&
          Object.keys(target).length === 0 ? (
            <div id={Object.keys(target).length === 0 ? 'box' : 'boxChosen'}>
              {allArticles.map(article => {
                return (
                  <ul
                    className='article'
                    key={article.id}
                    onClick={() => {
                      console.log(article);
                    }}
                  >
                    <img
                      className='thumbNail'
                      src={
                        article.image !== null ? article.image : defaultImage
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
                      <p className='text'>{article.title}</p>
                    </div>
                  </ul>
                );
              })}
            </div>
          ) : Object.keys(target).length !== 0 &&
            target !== undefined &&
            target !== null &&
            Object.keys(allArticles).length > 0 ? (
            <div id={Object.keys(target).length === 0 ? 'box' : 'boxChosen'}>
              {/*게시물 맵핑, 타겟이 있고 게시물도 있을 때 */}
              {allArticles.map(article => {
                return (
                  <ul
                    className='article'
                    key={article.id}
                    onClick={() => {
                      console.log(article);
                    }}
                  >
                    <img
                      className='thumbNail'
                      src={
                        article.image !== null ? article.image : defaultImage
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
                      <p className='text'>{article.title}</p>
                    </div>
                  </ul>
                );
              })}
            </div>
          ) : (
            '게시물이 없습니다.'
          )}
        </div>
      ) : (
        <div id='articleBoxChosen'>게시물이 없습니다.</div>
      )}
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
