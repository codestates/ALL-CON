import react from 'react';

function PostingBox(){
  return (
    <li id='postingBox'>
      <div id='orderBox'>
        <p className='hotOrder'>조회수</p>
        <p className='nearOrder'>임박예정</p>
        <p className='newOrder'>등록일</p>
      </div>
    <ul className='posting'>
      <p className='postingTitle'>[진주] 2021-22 YB 전국투어 콘서트〈LIGHTS〉</p>
      <p className='postingDate'>2022.02.26 ~ 2022.02.27</p>
      <p className='postingView'>조회수 2,366</p>
      <p className='conceretPlace'>경남문화예술회관 대공...</p>
    </ul>
    <ul className='posting'>
      <p className='postingTitle'>2022 AB6IX CONCERT [COMPLETE WITH...</p>
      <p className='postingDate'>2022.01.15 ~ 2022.01.26</p>
      <p className='postingView'>조회수 1,746</p>
      <p className='conceretPlace'>잠실실내체육관</p>
    </ul>
    <ul className='posting'>
      <p className='postingTitle'>2022 SF9 LIVE FANTASY #3 IMPERFECT</p>
      <p className='postingDate'>2022.01.21 ~ 2022.01.23</p>
      <p className='postingView'>조회수 536</p>
      <p className='conceretPlace'>올림픽공원 올림픽홀</p>
    </ul>
    <ul className='posting'>
      <p className='postingTitle'>TWICE 4TH WORLD TOUR ‘Ⅲ’</p>
      <p className='postingDate'>2021.12.25 ~ 2021.12.26</p>
      <p className='postingView'>조회수 237</p>
      <p className='conceretPlace'>KSPO DOME(올림픽체..</p>
    </ul>
  </li>
  )
}
export default PostingBox;