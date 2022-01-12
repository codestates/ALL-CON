import MyProfileBox from '../components/MyPage/MyProfileBox';
import MyArticleBox from '../components/MyPage/MyArticleBox';
import MyCommentBox from '../components/MyPage/MyCommentBox';
import Footer from '../components/Footer';

function MyPage() {
  return (
    <div id='myPageContainer'>
      <div id='myProfileBoxWrapper'>
        {/* 프로필 */}
        <MyProfileBox />
      </div>
      <div id='myArticleBoxWrapper'>
        {/* 나의 게시물 */}
        <MyArticleBox />
      </div>
      <div id='myCommentWrapper'>
        {/* 나의 댓글 */}
        <MyCommentBox />
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
export default MyPage;
