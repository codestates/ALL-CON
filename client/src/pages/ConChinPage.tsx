import react from 'react';
import ConChinPostingBox from '../components/ConChinPage/ConChinPostingBox';
import ConChinBox from '../components/ConChinPage/ConChinBox';
import banner from '../images/banner.png';
import Footer from '../components/Footer';

function ConChinPage() {
  return (
    <div id='conChinContainer'>
      <div id='conChinExceptFooter'>
        <img id='jumbotron' src={banner} />
        <div id='mainBox'>
          <ConChinPostingBox />
          <ConChinBox />
        </div>
      </div>
      <div id='fullFooter'>
        <div id='footerWrapper'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ConChinPage;
