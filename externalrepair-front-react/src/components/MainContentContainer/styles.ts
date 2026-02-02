import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const ContainerWrapper = styled.div`
  display: flex;
`;

export const Container = styled.div`
  background-color: var(--color-background-primary);
  border-radius: ${pxToRem(10)};
  width: 100%;
  min-height: 90dvh;
  max-height: 90dvh;
  box-sizing: border-box;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${pxToRem(8)};
`;

export const TitleHeader = styled.div`
  padding-top: ${pxToRem(20)};
  padding-left: ${pxToRem(40)};
  padding-bottom: ${pxToRem(50)};
  height: ${pxToRem(68)};
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const TitleText = styled.h1`
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: ${pxToRem(18)};
  color: var(--color-text-primary);
  line-height: ${pxToRem(23.436)};
  margin: 0;
`;

export const GoBackButton = styled.button`
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-size: ${pxToRem(12)};
  margin-right: ${pxToRem(40)};
  background-color: var(--color-background-secondary);
  border-radius: ${pxToRem(10)};
  height: ${pxToRem(23)};
  width: ${pxToRem(70)};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${pxToRem(4)};
`;

export const Icon24x24 = styled.span`
  width: ${pxToRem(24)};
  height: ${pxToRem(24)};
  font-size: ${pxToRem(24)};
  align-items: center;
  justify-content: center;
  font-weight: 300;
  color: var(--color-text-light);
`;

export const Icon10x10 = styled.span`
  width: ${pxToRem(10)};
  height: ${pxToRem(10)};
  font-size: ${pxToRem(18)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
`;

export const Divider = styled.hr<{ marginTop?: number }>`
  border: none;
  height: 1px;
  background-color: var(--color-border);
  margin-top: 0;
  margin-bottom: ${pxToRem(20)};
  margin-top: ${({ marginTop }) =>
    marginTop ? `${pxToRem(marginTop)}` : 'unset'};
`;
