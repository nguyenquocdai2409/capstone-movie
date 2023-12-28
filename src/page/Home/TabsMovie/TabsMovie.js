import React from "react";
import TabsMovieDesktop from "./TabsMovieDesktop";
import TabsMovieMobile from "./TabsMovieMobile";
import { useMediaQuery } from "react-responsive";
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

export default function TabsMovie() {
  return (
    <div>
      <Desktop>
        <TabsMovieDesktop />
      </Desktop>
      <Tablet>
        <TabsMovieDesktop />
      </Tablet>
      <Mobile>
        <TabsMovieMobile />
      </Mobile>
    </div>
  );
}
