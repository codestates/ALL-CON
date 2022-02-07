import insta from '../images/instaLogo.png';
import youtube from '../images/youtubeLogo.png';
import github from '../images/githubLogo.png';

function Footer() {
  return (
    <div id='FooterContainer'>
      <div className='team_members'>
        <div className='profiles'>
          <div className='profile'>
            <div id='paddingBox'>
              <a href='https://github.com/sun0-1106' target='_blank'>
                <img src={github} id='github' alt='깃허브 로고'/>
              </a>
            </div>
            <div className='text'>
              <div className='name'>최선영</div>
              <div className='role'>Front end</div>
              <div>
                sy.choi1106<br></br>@gmail.com
              </div>
            </div>
          </div>

          <div className='profile'>
            <div id='paddingBox'>
              <a href='https://github.com/Esoolgnah' target='_blank'>
                <img src={github} id='github' alt='깃허브 로고'/>
              </a>
            </div>
            <div className='text'>
              <div className='name'>정재혁</div>
              <div className='role'>Front end</div>
              <div>
                nezcoreen<br></br>@gmail.com
              </div>
            </div>
          </div>

          <div className='profile'>
            <div id='paddingBox'>
              <a href='https://github.com/JH8459' target='_blank'>
                <img src={github} id='github' alt='깃허브 로고'/>
              </a>
            </div>
            <div className='text'>
              <div className='name'>김정현</div>
              <div className='role'>Back end</div>
              <div>
                wjd5588<br></br>@gmail.com
              </div>
            </div>
          </div>

          <div className='profile'>
            <div id='paddingBox'>
              <a href='https://github.com/joykim93' target='_blank'>
                <img src={github} id='github' alt='깃허브 로고'/>
              </a>
            </div>
            <div className='text'>
              <div className='name'>김기쁨</div>
              <div className='role'>Back end</div>
              <div>
                joykim9311<br></br>@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='badges'>
        <a href='https://www.youtube.com/channel/UCh-iIz8NKcP6HNDMIxfkMVQ' target='_blank'>
          <img src={youtube} id='youtube' alt='유튜브 로고'></img>
        </a>
        <a href='https://www.instagram.com/allcon___/' target='_blank'>
          <img src={insta} id='insta' alt='인스타 로고'></img>
        </a>
      </div>
      <div id='copyright'>Copyright ⓒ 2021-2022 weAct</div>
    </div>
  );
}
export default Footer;
