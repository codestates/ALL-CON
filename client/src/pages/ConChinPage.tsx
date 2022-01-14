import react from 'react';
import ConChinPostingBox from '../components/ConChinPage/ConChinPostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import ConChinArticleContentBox from '../components/ConChinPage/ConChinArticleContentBox';
import banner from '../images/banner.png';
import Footer from '../components/Footer';
/* Store import */
import { RootState } from '../index';
/* Library import */
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ConChinPage() {
  const dispatch = useDispatch();
  const { target } = useSelector((state: RootState) => state.main);

  return (
    <div id='conChinContainer'>
      <div id='conChinExceptFooter'>
        <img id='jumbotron' src={banner} />
        <div
          id={
            Object.keys(target).length === 0
              ? 'postingWrapper'
              : 'postingWrapperChosen'
          }
        >
          {/* 콘서트 정보, target유무에따라 외부,내부 크기 변경 */}
          <ConChinPostingBox />
        </div>
        <div
          id={
            Object.keys(target).length === 0
              ? 'articleWrapper'
              : 'articleWrapperChosen'
          }
        >
          {/* 게시물 정보, target유무에따라 외부,내부 크기 변경, 가로 스크롤바 생성 */}
          <ConChinBox />
        </div>
      </div>
      <div
        id={
          Object.keys(target).length === 0
            ? 'contentsWrapper'
            : 'contentsWrapperChosen'
        }
      >
        {/* 게시물 내용, 없다가 생기므로 위치만 변경할 것. */}
        <ConChinArticleContentBox />
      </div>
      <div
        id={
          Object.keys(target).length === 0 ? 'fullFooter' : 'fullFooterChosen'
        }
      >
        <div id='footerWrapper'>
          {/* 푸터, target 유무에 따라 위치 변경 */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ConChinPage;
