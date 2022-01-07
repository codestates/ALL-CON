import MyProfileBox from '../components/MyPage/MyProfileBox';
import MyArticleBox from '../components/MyPage/MyArticleBox';
import MyCommentBox from '../components/MyPage/MyCommentBox';
import Footer from '../components/Footer';

function MyPage() {
  return (
    <div id='myPageContainer'>
      <div id='myProfileBoxWrapper'>
        <MyProfileBox />
      </div>
      <div id='myArticleBoxWrapper'>
        <MyArticleBox />
      </div>
      <div id='myCommentWrapper'>
        <MyCommentBox />
      </div>
      <div id='fullFooter'>
        <div id='footerWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default MyPage;
