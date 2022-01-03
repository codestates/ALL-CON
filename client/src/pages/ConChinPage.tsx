import react from 'react';
import PostingBox from '../components/ConChinPage/PostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';

function ConChinPage() {
  return(
    <div id='container'>
      <img id='jumbotron'/>
      <div id='mainBox'>
        <PostingBox/>
        <ConChinBox/>
      </div>
    </div>
  )
}

export default ConChinPage;
