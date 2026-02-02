import React from 'react';
import { FeedbackText, FeedbackWrapper, IconContainer } from './styles';

const DEFAULT_TEXT = 'Nenhuma atividade registrada até o momento';

const EmptyStateFeedback: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <FeedbackWrapper>
      <IconContainer>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 40, color: '#878787' }}
        >
          sentiment_dissatisfied
        </span>
      </IconContainer>
      <FeedbackText>{text || DEFAULT_TEXT}</FeedbackText>
    </FeedbackWrapper>
  );
};

export default EmptyStateFeedback;
