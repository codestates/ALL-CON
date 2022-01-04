import react from 'react';

function PostingBox(){
  return (
    <li id='conChinPostingBox'>
      <div id='orderBox'>
        <h1 id='orderBoxCurOrder'>조회수 순</h1>
        <p className='orderBoxOrder'>조회수</p>
        <p className='orderBoxOrder'>임박예정</p>
        <p className='orderBoxOrder'>등록일</p>
      </div>
    <ul className='conChinPosting'>
      <h1 className='conChinPostingTitle'>[진주] 2021-22 YB 전국투어 콘서트〈LIGHTS〉</h1>
      <p className='conChinPostingDate'>2022.02.26 ~ 2022.02.27</p>
      <p className='conChinPostingView'>조회수 2,366</p>
      <p className='conChinConcertPlace'>경남문화예술회관 대공...</p>
    </ul>
    <ul className='conChinPosting'>
      <h1 className='conChinPostingTitle'>2022 AB6IX CONCERT [COMPLETE WITH...</h1>
      <p className='conChinPostingDate'>2022.01.15 ~ 2022.01.26</p>
      <p className='conChinPostingView'>조회수 1,746</p>
      <p className='conChinConcertPlace'>잠실실내체육관</p>
    </ul>
    <ul className='conChinPosting'>
      <h1 className='conChinPostingTitle'>2022 SF9 LIVE FANTASY #3 IMPERFECT</h1>
      <p className='conChinPostingDate'>2022.01.21 ~ 2022.01.23</p>
      <p className='conChinPostingView'>조회수 536</p>
      <p className='conChinConcertPlace'>올림픽공원 올림픽홀</p>
    </ul>
    <ul className='conChinPosting'>
      <h1 className='conChinPostingTitle'>TWICE 4TH WORLD TOUR ‘Ⅲ’</h1>
      <p className='conChinPostingDate'>2021.12.25 ~ 2021.12.26</p>
      <p className='conChinPostingView'>조회수 237</p>
      <p className='conChinConcertPlace'>KSPO DOME(올림픽체..</p>
    </ul>
  </li>
  )
}
export default PostingBox;