import Jumbotron from '../components/Jumbotron';
import MainConcertInfo from '../components/MainPage/MainConcertInfo';

function MainPage() {
  return (
    <div id='mainContainer'>
      <div id='mainJumboWrapper'>
        <Jumbotron />
      </div>
      <div id='mainConcertInfoWrapper'>
        <MainConcertInfo />
      </div>
    </div>
  );
}

export default MainPage;
