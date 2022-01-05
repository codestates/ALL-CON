import react from 'react';
import PostingBox from '../components/ConChinPage/PostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import banner from '../images/banner.png';

function ConChinPage() {
  return(
    <div id='conChinContainer'>
      <img id='jumbotron' src= { banner }/>
      <div id='mainBox'>
        <PostingBox/>
        <ConChinBox/>
      </div>
    </div>
  )
}

export default ConChinPage;
