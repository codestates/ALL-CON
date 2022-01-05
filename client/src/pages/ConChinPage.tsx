import react from 'react';
import ConChinPostingBox from '../components/ConChinPage/ConChinPostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import banner from '../images/banner.png';

function ConChinPage() {
  return(
    <div id='conChinContainer'>
      <img id='jumbotron' src= { banner }/>
      <div id='mainBox'>
        <ConChinPostingBox/>
        <ConChinBox/>
      </div>
    </div>
  )
}

export default ConChinPage;
