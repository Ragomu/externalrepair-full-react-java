import styled from 'styled-components';
import { getTheme, pxToRem } from '@platformbuilders/theme-toolkit';
import workerImage from '~/assets/images/worker.png';
import { TextInput as DefaultTextInput, Typography } from '~/components';
import CustomButton from '~/components/CustomButton';
import { breakpoints } from '~/utils';

interface TextInputProps {
  status?: 'success' | 'failure' | 'default';
  borderColor?: string;
}

export const DEFAULT_BORDER_COLOR = '#E0E0E0';

// Theme constants
const spacing = {
  lg: getTheme('spacing.lg'),
  md: getTheme('spacing.md'),
  xxl: getTheme('spacing.xxl'),
  min: getTheme('spacing.min'),
  xmd: getTheme('spacing.xmd'),
  xl: getTheme('spacing.xl'),
  max: getTheme('spacing.max'),
};

// Layout constants
const LOGIN_PANEL_MAX_WIDTH = 625;
const LOGIN_PANEL_WIDTH = '50%';
const LOGIN_PANEL_MOBILE_WIDTH = '90%';
const LOGIN_PANEL_MOBILE_MAX_WIDTH = 400;
const LOGIN_PANEL_MOBILE_SMALL_WIDTH = '95%';
const LOGIN_PANEL_MOBILE_SMALL_MAX_WIDTH = 350;

// Form constants
const FORM_CONTAINER_WIDTH = 287;
const FORM_CONTAINER_HEIGHT = 374;
const FORM_CONTAINER_MOBILE_MAX_WIDTH = 400;
const FORM_CONTAINER_BORDER_RADIUS = 20;

// Button constants
const SUBMIT_BUTTON_MAX_WIDTH = 250;
const SUBMIT_BUTTON_HEIGHT = 46;
const SUBMIT_BUTTON_FONT_SIZE = 16;
const SUBMIT_BUTTON_BORDER_RADIUS = 48;

// Layout Components
export const LoginScreenWrapper = styled.div`
  display: flex;

  background-color: ${getTheme('background.z1')};
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    padding: ${spacing.lg}px 0;
  }
`;

export const BrandPanel = styled.div`
  background-image: url(${workerImage});
  background-size: cover;
  background-position: center;
  width: 625px;
  height: 715px;
  background-repeat: no-repeat;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin: 18px;
  transition: all 0.3s ease;
  position: relative;
  width: ${LOGIN_PANEL_WIDTH};
  height: calc(100vh - 36px);

  @media (max-width: 900px) {
    width: ${LOGIN_PANEL_MOBILE_WIDTH};
    max-width: ${LOGIN_PANEL_MOBILE_MAX_WIDTH}px;
    margin: 0 auto ${spacing.lg}px;
    order: -1;
    background-size: contain;
    background-position: top center;
    height: auto;
  }

  @media (max-width: ${breakpoints.inMobile}px) {
    width: ${LOGIN_PANEL_MOBILE_SMALL_WIDTH};
    max-width: ${LOGIN_PANEL_MOBILE_SMALL_MAX_WIDTH}px;
  }
`;

export const BrandTextContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: ${spacing.max}px;
  color: var(--color-background-primary);
  text-align: left;
  width: 100%;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.7) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  border-radius: 0 0 20px 20px;
`;

export const BrandTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
`;

export const BrandDescription = styled.p`
  font-size: 1rem;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
`;

export const Logo = styled.img`
  background-image: url('../../../assets/logo.png');
  width: ${pxToRem(100)};
  height: ${pxToRem(27)};

  @media (max-width: ${breakpoints.inTablet}px) {
    width: ${pxToRem(80)};
    height: ${pxToRem(22)};
  }
`;

export const LogoWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 10000;

  @media (max-width: ${breakpoints.inTablet}px) {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: ${spacing.lg}px;
    text-align: center;
  }
`;

export const BrandTagline = styled(Typography).attrs({ variant: 'md' })`
  color: ${getTheme('text.contrast')};
  text-align: center;
  margin-top: ${spacing.md}px;
`;

// Form Components
export const FormPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxl}px;
  height: 100vh;
  /* max-width: ${LOGIN_PANEL_MAX_WIDTH}px; */
  width: ${LOGIN_PANEL_WIDTH};

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    padding: ${spacing.lg}px ${spacing.md}px;
    justify-content: flex-start;
  }
`;

export const FormContainer = styled.div`
  width: ${pxToRem(FORM_CONTAINER_WIDTH)};
  min-height: ${pxToRem(FORM_CONTAINER_HEIGHT)};
  display: flex;
  background-color: ${getTheme('background.z2')};
  justify-content: center;
  border-radius: ${pxToRem(FORM_CONTAINER_BORDER_RADIUS)};
  padding: ${spacing.xl}px;
  border: 0.5px solid ${getTheme('brand.primary.border')};

  @media (max-width: ${breakpoints.inTablet}px) {
    width: 100%;
    max-width: ${pxToRem(FORM_CONTAINER_MOBILE_MAX_WIDTH)};
    min-height: auto;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// Typography Components
export const LoginHead = styled(Typography)`
  font-weight: 500;
  font-size: ${getTheme('fontSizes.sxl')}px;
  text-align: center;
  padding-bottom: ${spacing.xxl}px;
`;

export const ErrorMessage = styled.div`
  color: ${getTheme('danger.main')};
  font-weight: 500;
  font-size: 11px;
  padding-left: ${spacing.md}px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  font-size: 11px;
`;

// Input Components
export const InputFormContainer = styled.div`
  &:first-child {
    margin-bottom: ${pxToRem(8)};
  }
  position: 'relative';
`;

export const TextInput = styled(DefaultTextInput)<TextInputProps>`
  border-radius: ${pxToRem(SUBMIT_BUTTON_BORDER_RADIUS)};
  height: ${pxToRem(SUBMIT_BUTTON_HEIGHT)};
  margin-top: ${spacing.min}px;
  background-color: white;
  padding-left: ${spacing.xmd}px;
  padding-right: ${spacing.xl}px;
  color: #4b4545;
  &:focus {
    border: 1px solid var(--color-primary-blue);
  }
  &:hover {
    transition: border 0.2s ease-in-out;
    border: 1px solid var(--color-border);
  }
`;

// Button Components
export const RecoveryButton = styled.button`
  align-self: flex-end;
  width: 100%;
  letter-spacing: 0px !important;
  text-align: right;
  padding-right: 10px;
  padding-top: 5px;
  margin-right: ${spacing.min}px;
  width: fit-content !important;
  color: ${getTheme('brand.primary.placeholder')};
  background: none;
  border: none;
  font-size: ${getTheme('fontSizes.min')}px;
  letter-spacing: 0px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const SubmitButton = styled(CustomButton)`
  align-self: center;
  width: 100%;
  max-width: ${pxToRem(SUBMIT_BUTTON_MAX_WIDTH)};
  background-color: ${getTheme('brand.primary.orange')};
  border: none;
  color: white;
  border-radius: ${pxToRem(SUBMIT_BUTTON_BORDER_RADIUS)} !important;
  height: ${pxToRem(SUBMIT_BUTTON_HEIGHT)} !important;
  margin-top: ${spacing.xxl}px;
  font-size: ${pxToRem(SUBMIT_BUTTON_FONT_SIZE)};
  font-weight: 600;
  letter-spacing: 0px !important;
`;
