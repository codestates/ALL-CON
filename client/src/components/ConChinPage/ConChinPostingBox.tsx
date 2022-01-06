import react from 'react';
import ConChinPostingOrderBox from './ConChinPositngOrderBox';


function ConChinPostingBox(){
  return (
    <li id='conChinPostingBox'>
      <h1 id='curOrder'>조회수 순</h1>
      <ConChinPostingOrderBox/>
    <ul className='posting'>
      <h1 className='title'>[진주] 2021-22 YB 전국투어 콘서트〈LIGHTS〉</h1>
      <p className='date'>2022.02.26 ~ 2022.02.27</p>
      <p className='view'>조회수 2,366</p>
      <p className='place'>경남문화예술회관 대공...</p>
    </ul>
    <ul className='posting'>
      <h1 className='title'>2022 AB6IX CONCERT [COMPLETE WITH...</h1>
      <p className='date'>2022.01.15 ~ 2022.01.26</p>
      <p className='view'>조회수 1,746</p>
      <p className='place'>잠실실내체육관</p>
    </ul>
    <ul className='posting'>
      <h1 className='title'>2022 SF9 LIVE FANTASY #3 IMPERFECT</h1>
      <p className='date'>2022.01.21 ~ 2022.01.23</p>
      <p className='view'>조회수 536</p>
      <p className='place'>올림픽공원 올림픽홀</p>
    </ul>
  </li>
  )
}
export default ConChinPostingBox;