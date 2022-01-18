/* CSS import */
import mapMarker from '../../images/mapMarker.png'
/* Laibrary import */
import { useEffect } from 'react';

/* kakao 변수 전역 타입 설정 */
declare global {
  interface Window { kakao: any }
}
/* place props type 선언 */
interface placeProps { place?: string }

const KakaoMap = ( { place }: placeProps ) => {
  const { kakao } = window;

  /* proops로 전달받은 place값에 따라 렌더링  */
  useEffect(() => {
    mapHandler();
  }, [place]);

  /* kakao 지도 api 핸들러 */
  const mapHandler = async () => {
    const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스

    /* 지도 생성 */
    // 지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new kakao.maps.LatLng(37.4965621966412, 127.024761420493), // 지도의 중심좌표 (코드스테이츠)
      level: 4, // 지도의 레벨(확대, 축소 정도)
    };
    // 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options); 
    /* 지도 생성 */

    /* 키워드-좌표 변환 로직 */
    const kewordService = new kakao.maps.services.Places(); // 키워드-좌표 변환 객체 생성
    kewordService.keywordSearch(place, (result: any, status: any) => { 
      /* 키워드가 검색이 되는 경우 */
      if (status === kakao.maps.services.Status.OK) {
        // 키워드->좌표 변환
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        /* 커스텀 마커 설정 */
        // 마커이미지의 크기
        const imageSize = new kakao.maps.Size(44, 49); 
        // 마커이미지의 옵션, 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        const imageOption = { offset: new kakao.maps.Point(21, 49) }; 
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
        const markerImage = new kakao.maps.MarkerImage(mapMarker, imageSize, imageOption);
        /* 커스텀 마커 설정 */

        // 결과값으로 받은 위치를 마커로 표시
        const marker = new kakao.maps.Marker({
            position: coords,
            image: markerImage
        });
        marker.setMap(map);

        /* 인포윈도우 설정 */
        const placeInfo = `<div style="font-size:12px;font-weight:bold;width:200px;text-align:center;padding:6px;outline:2px solid #FFCE63;border:2px solid #FFCE63;"><a href="https://map.kakao.com/link/search/${place}" style="color:FFCE63" target="_blank">${place}</a></div>`;
        // 인포윈도우로 장소에 대한 설명을 표시합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: placeInfo
        });
        infowindow.open(map, marker);
        /* 인포윈도우 설정 */

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }

  return (
    <div id="map" style={{ width: "100%", height: "100%" }}></div>
  );
}

export default KakaoMap;