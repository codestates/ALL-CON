/* CSS import */
import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import ConChinArticleOrderBox from './ConChinArticleOrderBox';
import ConChinArticlePagination from './ConChinArticlePagination';
/* Store import */
import { RootState } from '../../index';
/* Library import */
import { useSelector, useDispatch } from 'react-redux';

function ConChinArticleBox() {
  const { target } = useSelector((state: RootState) => state.main);
  return (
    <div
      id={
        Object.keys(target).length === 0
          ? 'conChinArticleBox'
          : 'conChinArticleBoxChosen'
      }
    >
      <ConChinArticleOrderBox />
      <div
        id={
          Object.keys(target).length === 0 ? 'articleBox' : 'articleBoxChosen'
        }
      >
        <div id={Object.keys(target).length === 0 ? 'box' : 'boxChosen'}>
          <ul className='article'>
            <img className='thumbNail' src={defaultImage}></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={groupImage} />
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={viewImage} />
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
            <img className='thumbNail' src={defaultImage}></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={groupImage} />
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={viewImage} />
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
            <img className='thumbNail' src={defaultImage}></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={groupImage} />
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={viewImage} />
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
            <img className='thumbNail' src={defaultImage}></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={groupImage} />
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={viewImage} />
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
            <img className='thumbNail' src={defaultImage}></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={groupImage} />
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={viewImage} />
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
          <ul className='article'>
            <img className='thumbNail' src={defaultImage}></img>
            <div id='conChinmemberBoxWrapper'>
              <div className='memberBox'>
                <img className='icon' src={groupImage} />
                <div className='count'>1/3</div>
              </div>
            </div>
            <div className='title'>
              <img className='icon' src={viewImage} />
              <p className='count'>523</p>
              <p className='date'>2021.12.24</p>
              <p className='text'>소심한 성격입니다. 조용히..</p>
            </div>
          </ul>
        </div>
        {/* <div id='box'> */}
        {/* <ul className='article'>
          <img className='thumbNail' src={defaultImage}></img>
          <div id='conChinmemberBoxWrapper'>
            <div className='memberBox'>
              <img className='icon' src={groupImage} />
              <div className='count'>1/3</div>
            </div>
          </div>
          <div className='title'>
            <img className='icon' src={viewImage} />
            <p className='count'>523</p>
            <p className='date'>2021.12.24</p>
            <p className='text'>소심한 성격입니다. 조용히..</p>
          </div>
        </ul>
        <ul className='article'>
          <img className='thumbNail' src={defaultImage}></img>
          <div id='conChinmemberBoxWrapper'>
            <div className='memberBox'>
              <img className='icon' src={groupImage} />
              <div className='count'>1/3</div>
            </div>
          </div>
          <div className='title'>
            <img className='icon' src={viewImage} />
            <p className='count'>523</p>
            <p className='date'>2021.12.24</p>
            <p className='text'>소심한 성격입니다. 조용히..</p>
          </div>
        </ul>
        <ul className='article'>
          <img className='thumbNail' src={defaultImage}></img>
          <div id='conChinmemberBoxWrapper'>
            <div className='memberBox'>
              <img className='icon' src={groupImage} />
              <div className='count'>1/3</div>
            </div>
          </div>
          <div className='title'>
            <img className='icon' src={viewImage} />
            <p className='count'>523</p>
            <p className='date'>2021.12.24</p>
            <p className='text'>소심한 성격입니다. 조용히..</p>
          </div>
        </ul> */}
        {/* </div> */}
      </div>
      <div
        id={
          Object.keys(target).length === 0
            ? 'paginationWrapper'
            : 'paginationWrapperChosen'
        }
      >
        <ConChinArticlePagination />
      </div>
    </div>
  );
}
export default ConChinArticleBox;
