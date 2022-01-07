import MyProfileBox from '../components/MyPage/MyProfileBox';
import MyArticleBox from '../components/MyPage/MyArticleBox';
import MyCommentBox from '../components/MyPage/MyCommentBox';

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
      <div id='myFooterWrapper'>
        <>Footer</>
      </div>
    </div>
  );
}
export default MyPage;
