function ConcertPage() {
  return (
    <div id='concertContainer'>
      <div id='lineOrderWrapper'>
        <div id='bottomLineOrderBox'>
          <p className='order'>조회수</p>
          <p className='order'>임박예정</p>
          <p className='order'>등록일</p>
        </div>
      </div>
      <div id='concertBoxWrapper'></div>
    </div>
  );
}

export default ConcertPage;
