/* CSS import */
import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import ConChinArticleOrderBox from './ConChinArticleOrderBox';
import ConChinArticlePagination from './ConChinArticlePagination';
/* Store import */
import { RootState } from '../../index';
import {
  setArticleOrder,
  setAllArticles,
  setArticleTotalPage,
  setTargetArticle,
  setTargetArticlesUserInfo,
} from '../../store/ConChinSlice';
import { setTarget, setAllConcerts } from '../../store/MainSlice';
/* Library import */
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

function ConChinArticleBox() {
  const dispatch = useDispatch();
  const { target, allConcerts } = useSelector((state: RootState) => state.main);
  const { allArticles, targetArticle, targetArticlesUserInfo } = useSelector(
    (state: RootState) => state.conChin,
  );

  /* 게시물에 관련된 콘서트 정보 조회 핸들러 */
  const getTargetArticlesConcert = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTarget(response.data.data.concertInfo));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 게시물 정보 조회 핸들러 */
  const getTargetArticlesInfo = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert/${target.id}/article/${id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTargetArticle(response.data.data.articleInfo));
        console.log('ConChinArticleBox=> articleInfo 조회 성공입니다.');
        console.log(targetArticle);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* 게시물 작성자 유저정보 조회 핸들러 */
  const getTargetArticlesUserInfo = async (id: number) => {
    try {
      console.log('targetUserInfo: ' + id);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/other/${id}`,
        { withCredentials: true },
      );
      if (response.data) {
        dispatch(setTargetArticlesUserInfo(response.data.data.userInfo));
        console.log('ConChinArticleBox=> userInfo 조회 성공입니다.');
        console.log(targetArticlesUserInfo);
      }
    } catch (err) {
      console.log('targetUserInfo: ' + id);
      console.log(err);
    }
  };

  /* useEffect: 정렬순으로 전체 콘서트, 게시물 받아오기  */
  // useEffect(() => {
  //   getAllArticles();
  // }, []);

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
                    className={
                      article.id === targetArticle.id
                        ? 'articleChosen'
                        : 'article'
                    }
                    key={article.id}
                    onClick={() => {
                      getTargetArticlesInfo(article.id);
                      getTargetArticlesConcert(article.concert_id);
                      getTargetArticlesUserInfo(article.user_id);
                      console.log(article.concert_id);
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
                      <p className='date'>{article.createdAt}</p>
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
                    className={
                      article.id === targetArticle.id
                        ? 'articleChosen'
                        : 'article'
                    }
                    key={article.id}
                    onClick={() => {
                      getTargetArticlesInfo(article.id);
                      getTargetArticlesConcert(article.concert_id);
                      getTargetArticlesUserInfo(article.user_id);
                      console.log(article.concert_id);
                    }}
                  >
                    <img
                      className={
                        article.id === targetArticle.id
                          ? 'thumbNailChosen'
                          : 'thumbNail'
                      }
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
                      <p className='date'>{article.createdAt}</p>

                      <p className='text'>{article.title}</p>
                    </div>
                  </ul>
                );
              })}
            </div>
          ) : (
            '게시물이 없습니다. '
          )}
        </div>
      ) : (
        <div id='articleBoxChosen'>게시물이 없습니다. 😢</div>
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
