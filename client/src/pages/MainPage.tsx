import Jumbotron from '../components/Jumbotron';
import MainConcertInfo from '../components/MainPage/MainConcertInfo';
import MainFindConchin from '../components/MainPage/MainFindConchin';

function MainPage() {
  return (
    <div id='mainContainer'>
      <div id='mainJumboWrapper'>
        <Jumbotron />
      </div>
      <div id='mainConcertInfoWrapper'>
        <MainConcertInfo />
      </div>
      <div id='mainCommentWrapper'></div>
      <div id='mainFindConchinWrapper'>
        <MainFindConchin />
      </div>
    </div>
  );
}

export default MainPage;
