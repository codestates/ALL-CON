import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import ConChinArticleOrderBox from './ConChinArticleOrderBox';
import ConChinArticlePagination from './ConChinArticlePagination';

function ConChinArticleBox(){
  return(
    <div id='conChinArticleBox'>
      <ConChinArticleOrderBox/>
      <div id='articleBox'>
        <div id='box'>
          <ul className='article'>
            <img className='thumbNail' src={ defaultImage }></img>
              <div id='conChinmemberBoxWrapper'>
                <div className='memberBox'>
                  <img className='icon' src={ groupImage }/>
                  <div className='count'>1/3</div>
                </div>
              </div>
            <div className='title'>
              <img className='icon' src={ viewImage }/>
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
          <img className='thumbNail' src={ defaultImage }></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={ groupImage }/>
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={ viewImage }/>
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
          <img className='thumbNail' src={ defaultImage }></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={ groupImage }/>
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={ viewImage }/>
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
        </div>
        <div id='box'>
          <ul className='article'>
          <img className='thumbNail' src={ defaultImage }></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={ groupImage }/>
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={ viewImage }/>
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
          <img className='thumbNail' src={ defaultImage }></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={ groupImage }/>
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={ viewImage }/>
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
          <img className='thumbNail' src={ defaultImage }></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={ groupImage }/>
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={ viewImage }/>
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
        </div>  
      </div>
      <ConChinArticlePagination/>

    </div>
  )
}
export default ConChinArticleBox;