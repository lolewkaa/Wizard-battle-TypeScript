import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import styles from './Layout.module.css';
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import PopupWithWarning from "../PopupWithWarning/PopupWithWarning.tsx";

type Props = {
    children: any,
}

const Layout: React.FC<Props> = ({ children }) => {
  const [isOpenPopupWarning, setIsOpenPopupWarning] = useState(false);
  //   const isBattleStartedJson = localStorage.getItem('isBattleStarted');
  // //   const [isBattleStarted, setIsBattleStarted] = useState<boolean | void>(
  // //     isBattleStartedJson ? JSON.parse(isBattleStartedJson) : null || false,
  // //   );
  //   const location = useLocation();
  //   useEffect(() => {
  //     if (location.pathname !== "/battle" && isBattleStarted === true) {
  //       setIsOpenPopupWarning(true);
  //     }
  //   }, [location.pathname !== '/battle']);

  return (
        <>
            <Header />
            <main className={styles.page}>{children}</main>
            <Footer />
            {isOpenPopupWarning && (
            <PopupWithWarning
                setIsOpenPopupWarning={setIsOpenPopupWarning}
            ></PopupWithWarning>
            )}
        </>
  );
};

export default Layout;
