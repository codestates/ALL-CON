import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';

function ConChinArticleBox(){
  return(
    <div id='conChinArticleBox'>
      <div id='noLineOrderBox'>
        <p className='order'>조회수순</p>
        <p className='order'>최신순</p>
      </div>
      <div id='articleBox'>
        <div id='box'>
          <ul className='article'>
            <img className='thumbNail' src={ defaultImage }></img>
            <div className='memberBox'>
              <img className='icon' src={ groupImage }/>
              <div className='count'>1/3</div>
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
            <div className='memberBox'>
              <img className='icon' src={ groupImage }/>
              <div className='count'>1/3</div>
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
            <div className='memberBox'>
              <img className='icon' src={ groupImage }/>
              <div className='count'>1/3</div>
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
            <div className='memberBox'>
              <img className='icon' src={ groupImage }/>
              <div className='count'>1/3</div>
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
            <div className='memberBox'>
              <img className='icon' src={ groupImage }/>
              <div className='count'>1/3</div>
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
            <div className='memberBox'>
              <img className='icon' src={ groupImage }/>
              <div className='count'>1/3</div>
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
      <div id='pagination'>
        <ul className='page'>
          <p className='text'>1</p>
        </ul>
        <ul className='page'>
          <p className='text'>2</p>
        </ul>
        <ul className='page'>
          <p className='text'>3</p>
        </ul>
        <ul className='page'>
          <p className='text'>4</p>
        </ul>
        <ul className='page'>
          <p className='text'>5</p>
        </ul>
      </div>
    </div>
  )
}
export default ConChinArticleBox;