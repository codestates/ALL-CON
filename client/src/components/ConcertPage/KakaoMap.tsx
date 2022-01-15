import axios from "axios";
import { useEffect } from 'react';

/* kakao 변수 전역 타입 설정 */
declare global {
  interface Window { kakao: any }
}
/* place props type 선언 */
interface placeProps { place?: string }

const KakaoMap = ( { place }: placeProps ) => {
  const { kakao } = window;
  useEffect(() => {
    mapHandler();
  }, [place]);
  console.log(place);

  /* kakao 지도 api 핸들러 */
  const mapHandler = async () => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 4, // 지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
    

    /* 테스트 중... */
    const kewordService = new kakao.maps.services.Places(); // 키워드-좌표 변환 객체 생성
    
    /* 주소-좌표 전환 검색... */
    kewordService.keywordSearch(place, (result: any, status: any) => { 
      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:200px;color:black;text-align:center;padding:6px 0;">'+place+'</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      } 
    });
  }

  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </>
  );
}

export default KakaoMap;