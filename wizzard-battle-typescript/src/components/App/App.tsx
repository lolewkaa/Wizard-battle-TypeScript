import React, { useState, useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../Header/Header.tsx';
import SelectionButtons from '../SelectionButtons/SelectionButtons.tsx';
import Footer from '../Footer/Footer.tsx';
import AutoSelect from '../AutoSelect/AutoSelect.tsx';
import IndependentSelect from '../IndependentSelect/IndependentSelect.tsx';
import Battle from '../Battle/Battle.tsx';
import PopupWithWarning from '../PopupWithWarning/PopupWithWarning.tsx';
import Feedback from '../Feedback/Feedback.tsx';

const App: React.FC = () => {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isOpenPopupWarning, setIsOpenPopupWarning] = useState(false);
  const [isBattleStarted, setIsBattleStarted] = useState(
    JSON.parse(localStorage.getItem("isBattleStarted") as string) || false,
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/battle" && isBattleStarted === true) {
      setIsOpenPopupWarning(true);
    }
  }, [location.pathname !== '/battle']);

  return (
    <div className={styles.page}>
       <Header />
       <Routes>
        <Route
              path="/"
              element={
                <SelectionButtons
                />
              }
            />
            <Route
            path="/auto-selection"
            element={
              <AutoSelect
                isOpenPopup={isOpenPopup}
                setIsOpenPopup={setIsOpenPopup}
                // setIsBlockButtonFind={setIsBlockButtonFind}
                // isBlockButtonFind={isBlockButtonFind}
              />
            }
            />
            <Route
            path="/manual-selection"
            element={
              <IndependentSelect
                isOpenPopup={isOpenPopup}
                setIsOpenPopup={setIsOpenPopup}
              />
            }
          />
          <Route
            path="/battle"
            element={
              <Battle
                setIsBattleStarted={setIsBattleStarted}
                isOpenPopup={isOpenPopup}
                setIsOpenPopup={setIsOpenPopup}
              />
            }
          />
          <Route path="/feedback" element={<Feedback />} />
       </Routes>
       <Footer />
       {isOpenPopupWarning && (
        <PopupWithWarning
          setIsOpenPopupWarning={setIsOpenPopupWarning}
        ></PopupWithWarning>
       )}
    </div>
  );
};
export default App;
