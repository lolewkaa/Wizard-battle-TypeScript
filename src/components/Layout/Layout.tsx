import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import PopupWithWarning from "../PopupWithWarning/PopupWithWarning.tsx";
import useLocalStorage from "../../hooks/useLocalStorage.tsx";

type PropsLayout = {
  children: any;
};

const Layout: React.FC<PropsLayout> = ({ children }) => {
  const [isOpenPopupWarning, setIsOpenPopupWarning] = useState<boolean>(false);
  const [isBattleStarted, setIsBattleStarted] = useLocalStorage(
    "isBattleStarted",
    null,
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/battle") {
      setIsBattleStarted(true);
    }
    if (location.pathname !== "/battle" && isBattleStarted === true) {
      setIsOpenPopupWarning(true);
    }
  }, [location.pathname !== "/battle"]);
  return (
    <>
      <Header />
      <main className={styles.page}>{children}</main>
      <Footer />
      {isOpenPopupWarning && localStorage.getItem("isBattleStarted") && (
        <PopupWithWarning
          setIsOpenPopupWarning={setIsOpenPopupWarning}
          message="Are you sure you want to leave the battle page? All changes will be
                deleted."
        ></PopupWithWarning>
      )}
    </>
  );
};

export default Layout;
