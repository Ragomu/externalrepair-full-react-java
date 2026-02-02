import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const FeedbackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: ${pxToRem(118)};
  margin: ${pxToRem(20)} auto;
`;

export const IconContainer = styled.div`
  width: ${pxToRem(80)};
  height: ${pxToRem(80)};
  border-radius: 50%;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${pxToRem(16)};
`;

export const FeedbackText = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: ${pxToRem(14)};
  color: #878787;
  text-align: center;
  line-height: ${pxToRem(18.23)};
  margin: 0;
`;
