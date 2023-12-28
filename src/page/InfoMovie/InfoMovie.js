import React from "react";
import { useMediaQuery } from "react-responsive";
import InfoMovieDesktop from "./InfoMovieDesktop";
import InfoMovieMobile from "./InfoMovieMobile";

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

export default function InfoMovie() {
  return (
    <div>
      <Desktop>
        <InfoMovieDesktop />
      </Desktop>
      <Tablet>
        <InfoMovieDesktop />
      </Tablet>
      <Mobile>
        <InfoMovieMobile />
      </Mobile>
    </div>
  );
}
