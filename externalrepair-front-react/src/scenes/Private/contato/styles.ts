import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 36px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

export const SectionTitle = styled.h1`
  margin: 0 0 8px 0;
  color: var(--color-text-dark);
  font-size: 40px;
  line-height: 44px;
`;

export const Lead = styled.p`
  margin: 0 0 16px;
  color: var(--color-text-medium);
`;

export const Form = styled.form``;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.div`
  font-size: 12px;
  color: var(--color-text-light);
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-background-primary);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-background-primary);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  min-height: 160px;
  resize: vertical;
`;

export const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  background: var(--color-success-green);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export const Pills = styled.div`
  display: flex;
  gap: 12px;
  margin: 8px 0 12px;
  flex-wrap: wrap;
`;

export const Pill = styled.span<{ $active?: boolean }>`
  padding: 6px 16px;
  border-radius: 27px;
  background: ${({ $active }) =>
    $active ? 'var(--color-warning-yellow-light)' : '#f0f0f0'};
  color: ${({ $active }) =>
    $active ? 'var(--color-warning-yellow-dark)' : '#515151'};
  border: ${({ $active }) =>
    $active ? '1px solid var(--color-warning-yellow-dark)' : 'none'};
  font-size: 12px;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  background: #efefef;
  color: #515151;
  font-size: 12px;
`;

export const ContactsPanel = styled(Card)`
  padding: 20px;
`;

export const ContactsScroll = styled.div`
  max-height: 360px;
  overflow: auto;
  padding-right: 8px;
`;

export const ContactBlock = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #dedede;

  &:last-child {
    border-bottom: none;
  }
`;

export const Dept = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Muted = styled.div`
  color: #828282;
  font-size: 12px;
  line-height: 1.4;
`;

export const Person = styled.div`
  margin-top: 16px;
  color: #515151;
  font-weight: 600;
  font-size: 13px;
`;

export const Line = styled.div`
  color: #626262;
  font-size: 12px;
`;
