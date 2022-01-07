import insta from '../images/instaLogo.png';
import youtube from '../images/youtubeLogo.png';
import github from '../images/githubLogo.png';

function Footer() {
  return (
    <div id='FooterContainer'>
      <div className='team_members'>
        <div className='profiles'>
          <div className='profile'>
            <img src={github} id='github'></img>
            <div className='text'>
              <div>최선영</div>
              <div>Front end</div>
              <div>
                sy.choi1106<br></br>@gmail.com
              </div>
            </div>
          </div>

          <div className='profile'>
            <img src={github} id='github'></img>
            <div className='text'>
              <div>정재혁</div>
              <div>Front end</div>
              <div>
                nezcoreen<br></br>@gmail.com
              </div>
            </div>
          </div>

          <div className='profile'>
            <img src={github} id='github'></img>
            <div className='text'>
              <div>김정현</div>
              <div>Back end</div>
              <div>
                wjd5588<br></br>@gmail.com
              </div>
            </div>
          </div>

          <div className='profile'>
            <img src={github} id='github'></img>
            <div className='text'>
              <div>김기쁨</div>
              <div>Back end</div>
              <div>
                joykim9311<br></br>@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='badges'>
        <img src={youtube} id='youtube'></img>
        <img src={insta} id='insta'></img>
      </div>
      <div id='copyright'>Copyright ⓒ 2021-2022 weAct</div>
    </div>
  );
}
export default Footer;
