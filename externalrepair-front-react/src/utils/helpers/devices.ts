import { screenSizes } from './breakpoints';

const screenWidth = window.innerWidth;

export const devices = {
  isMobile: screenSizes.tablet >= screenWidth,
  isTablet:
    screenSizes.tablet > screenWidth && screenSizes.desktop < screenWidth,
  isDesktop: screenSizes.desktop >= screenWidth,
} as DevicesType;
