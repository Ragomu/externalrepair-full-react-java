import { lazy } from 'react';
import styled from 'styled-components';
import { ButtonProps } from '@platformbuilders/fluid-react/dist/components/Button';
import { ClientOnly } from '@platformbuilders/vike-builders/ClientOnly';
const ButtonComponent = lazy(
  () => import('@platformbuilders/fluid-react/dist/components/Button'),
);

export const Button = styled((props: ButtonProps) => (
  <ClientOnly>
    <ButtonComponent {...props} />
  </ClientOnly>
))<ButtonProps>`
  .text-button {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: unset !important;
    font-weight: unset !important;
    color: unset !important;
    height: unset !important;
    width: unset !important;
    border-radius: unset !important;
    padding: unset !important;
  }
`;
