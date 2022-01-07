import react from 'react';
import ConChinArticleBox from './ConChinArticleBox';
import ConChinFindBox from './ConChinFindBox';
import ConChinArticleContentBox from './ConChinArticleContentBox';

function ConChinBox() {
  return (
    <div id='conChinBox'>
      <ConChinFindBox />
      <ConChinArticleBox />
      <ConChinArticleContentBox />
    </div>
  );
}
export default ConChinBox;
