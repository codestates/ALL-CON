import react from 'react';
import ConChinPostingBox from '../components/ConChinPage/ConChinPostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import ConChinArticleContentBox from '../components/ConChinPage/ConChinArticleContentBox';
import banner from '../images/banner.png';
import Footer from '../components/Footer';

function ConChinPage() {
  return (
    <div id='conChinContainer'>
      <div id='conChinExceptFooter'>
        <img id='jumbotron' src={banner} />
        <div id='postingWrapper'>
          {/* 콘서트 정보 */}
          <ConChinPostingBox />
        </div>
        <div id='articleWrapper'>
          {/* 게시물 */}
          <ConChinBox />
        </div>
      </div>
      <div id='contentsWrapper'>
        {/* 게시물 내용 */}
        <ConChinArticleContentBox />
      </div>
      <div id='fullFooter'>
        <div id='footerWrapper'>
          {/* 푸터 */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ConChinPage;
