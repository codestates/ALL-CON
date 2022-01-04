import react from 'react';
import PostingBox from '../components/ConChinPage/PostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import banner from '../images/banner.png';

function ConChinPage() {
  return(
    <div id='conChinContainer'>
      <img id='conChinJumbotron' src= { banner }/>
      <div id='conChinMainBox'>
        <PostingBox/>
        <ConChinBox/>
      </div>
    </div>
  )
}

export default ConChinPage;
