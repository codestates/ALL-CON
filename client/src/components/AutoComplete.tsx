/* CSS import */
import search from '../images/search.png';
/* Store import */
import { RootState } from '../index';
import {
  setTarget,
  setOrder,
  setPassToConcert,
  setAllConcerts,
} from '../store/MainSlice';
import { showConcertModal, showSuccessModal } from '../store/ModalSlice';
import { insertAlertText, insertBtnText } from '../store/ModalSlice';
import { setHeaderAllConcerts } from '../store/HeaderSlice';
/* Library import */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function AutoComplete() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allConcerts } = useSelector((state: RootState) => state.main);
  const { headerAllConcerts, headerIsRendered } = useSelector(
    (state: RootState) => state.header,
  );

  const [hasText, setHasText] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<number>(-1);

  /*전체 콘서트 받아오기(정렬순:view) */
  const getAllConcerts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=view`,
        { withCredentials: true },
      );
      if (response.data) {
        /* 서버 응답값이 있다면 & target 상태 변경 */
        deselectedOptions = headerAllConcerts.map(el => {
          return el.title;
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*전체 콘서트 받아오기(정렬순:view) */
  const getAllConcertsClick = async (clickedOption?: any) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/concert?order=view`,
        { withCredentials: true },
      );
      const clickedIdx = deselectedOptions.indexOf(clickedOption);
      if (response.data) {
        /* 서버 응답값이 있다면 & target 상태 변경 */
        dispatch(setAllConcerts(response.data.data.concertInfo));
        dispatch(setOrder('view'));
        dispatch(setTarget({}));
        dispatch(setTarget(headerAllConcerts[clickedIdx]));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let deselectedOptions = headerAllConcerts.map(el => {
    return el.title;
  });
  let optionsImages = headerAllConcerts.map(el => {
    return el.image_concert;
  });
  useEffect(() => {
    getAllConcerts();
  }, []);

  useEffect(() => {
    if (inputValue === '') {
      setHasText(false);
      setOptions([]);
      setSelected(-1);
    }

    if (inputValue !== '') {
      setOptions(
        deselectedOptions.filter(el => {
          return el.includes(inputValue);
        }),
      );
    }
  }, [inputValue]);

  //input 변경시 핸들러
  const handleInputChange = (event?: any) => {
    setInputValue(event.target.value);
    setHasText(true);
  };

  //선택한 option으로 inputValue 변경 핸들러
  const handleDropDownClick = (clickedOption?: any) => {
    setInputValue(clickedOption);
    //클릭한 콘서트의 전체콘서트에 대한 인덱스값
    const clickedIdx = deselectedOptions.indexOf(clickedOption);

    //headerAllConcerts에 clickedIdx로 접근하여 target 변경
    getAllConcertsClick(clickedOption);
    // dispatch(insertAlertText('관련 콘서트 페이지로 이동합니다! 🙂'));
    // dispatch(insertBtnText('확인'));
    // dispatch(showSuccessModal(true));
    dispatch(setTarget(headerAllConcerts[clickedIdx]));
    dispatch(setPassToConcert(true));

    //콘서트 모달 띄우고 콘서트페이지로 이동
    dispatch(showConcertModal(true));
    navigate('/concert');
    setInputValue('');
  };

  //x버튼 핸들러 => 인풋 지우고 드랍다운 해제
  const handleDeleteButtonClick = (event?: any) => {
    setInputValue('');
  };

  //option 키보드 선택 핸들러
  const handleKeyUp = (event?: any) => {
    if (hasText) {
      //아래 키 입력
      if (event.key === 'ArrowDown' && options.length - 1 > selected) {
        setSelected(selected + 1);
      }
      //위 키 입력
      if (event.key === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      //Enter키로 option 선택 => 클릭과 같음
      if (event.key === 'Enter' && selected >= 0) {
        handleDropDownClick(options[selected]);
        setSelected(-1);
      }
    }
  };

  return (
    <div id='hiddenSearchBox'>
      <div id='searchWrapper'>
        <input
          className='searchBar'
          placeholder='검색어를 입력해주세요.'
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          onClick={getAllConcerts}
        ></input>
        <div
          className={
            inputValue.length > 0 ? 'deleteButton' : 'deleteButtonUnShow'
          }
          onClick={handleDeleteButtonClick}
        >
          &times;
        </div>
      </div>
      <div id='imgWrapper'>
        <img className='img' alt='searchImg' src={search} />
      </div>
      <div
        id={inputValue.length > 0 ? 'dropDownWrapper' : 'dropDownWrapperHide'}
      >
        {hasText
          ? options.map((option, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => handleDropDownClick(option)}
                  className={selected === idx ? 'selected' : ''}
                >
                  <div>
                    <img
                      src={optionsImages[deselectedOptions.indexOf(option)]}
                      alt='optionsImages'
                    />
                  </div>
                  <p>{option}</p>
                </li>
              );
            })
          : null}
      </div>
    </div>
  );
}
export default AutoComplete;
