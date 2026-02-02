import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  margin-bottom: 0;
  min-width: 0;
  max-width: none;
  width: 90px;
  &:hover button {
    opacity: 1;
    pointer-events: all;
  }
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const NameWrapper = styled.div`
  display: flex;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Name = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #e6f9ee;
  text-align: center;
  margin-bottom: 8px;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProgressBarBg = styled.div`
  background: var(--color-progress-bar-bg);
  border-radius: 5px;
  width: 100%;
  height: 6px;
  margin-right: 0;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  background: var(--color-progress-bar);
  height: 100%;
  border-radius: 5px;
  transition: width 0.3s ease;
`;

export const ProgressText = styled.span`
  display: none;
`;

export const Tooltip = styled.div`
  background: #32a655;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

export const CloseButton = styled.button`
  background: #7feda0;
  border: none;
  color: #32a655;
  font-size: 15px;
  cursor: pointer;
  width: 15px;
  height: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  margin-left: 6px;
  transition: opacity 0.2s;
  &:after {
    content: 'x';
    font-weight: 400;
    line-height: 1;
    width: 15px;
    height: 15px;
  }
`;
