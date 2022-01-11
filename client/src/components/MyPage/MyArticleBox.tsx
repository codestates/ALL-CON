import defaultImage from '../../images/default_image.jpg';
import viewImage from '../../images/view.png';
import groupImage from '../../images/group.png';
import MyArticlePagination from './MyArticlePagination';

function MyArticleBox() {
  return (
    <div id='myArticleBox'>
      <div id='titleWrapper'>
        <p className='title'>내가 쓴 게시물</p>
      </div>
      <div id='articleWrapper'>
        <div id='articleBox'>
          <div id='box'>
            <ul className='article'>
              <img className='thumbNail' src={defaultImage}></img>
              <div id='myMemberBoxWrapper'>
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
              <div id='myMemberBoxWrapper'>
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
              <div id='myMemberBoxWrapper'>
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
          <div id='box'>
            <ul className='article'>
              <img className='thumbNail' src={defaultImage}></img>
              <div id='myMemberBoxWrapper'>
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
              <div id='myMemberBoxWrapper'>
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
              <div id='myMemberBoxWrapper'>
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
        </div>
      </div>
      <div id='paginationWrapper'>
        <MyArticlePagination />
      </div>
    </div>
  );
}

export default MyArticleBox;
