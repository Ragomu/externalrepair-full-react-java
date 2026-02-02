import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  background: #3bbe62;
  border-radius: 20px;
  padding: 20px;
  min-height: 110px;
  width: 100%;
  box-sizing: border-box;
  height: 135px;
  flex-direction: row;
`;

export const Preview = styled.button<{ $isActive?: boolean }>`
  width: 115px;
  height: 96px;
  border: 1px solid #fff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
  font-size: 36px;
  color: #fff;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.7)};
  background: ${({ $isActive }) => ($isActive ? '#34d97b22' : 'transparent')};
  cursor: pointer;
  transition:
    box-shadow 0.2s,
    opacity 0.2s,
    background 0.2s;
  outline: none;
  border-style: solid;
  &:hover,
  &:focus {
    opacity: 1;
    box-shadow: 0 0 0 1px #fff4;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  height: 100%;
`;

export const ImagesInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ImagesList = styled.div`
  display: flex;
  gap: 24px;
  margin-top: auto;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const ImageName = styled.div`
  color: #e6f9ee;
  font-size: 16px;
  white-space: normal;
`;

export const ViewButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  margin-left: 32px;
  transition: text-decoration 0.2s;
  text-decoration: underline transparent;
  padding: 8px;
  border-radius: 8px;
  &:hover {
    background-color: var(--color-progress-bar-bg);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
`;
