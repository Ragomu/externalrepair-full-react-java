import React, { useRef } from 'react';
import { useStore } from '~/stores';
import { Icon } from '../../ImagePreviewModal/styles';
import { Text } from '../../Typography/styles';
import { InputDisposalReportContainer, RowFieldDiscardReport } from './styles';

interface DisposalReportProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  subItemId?: number;
}

const DisposalReport: React.FC<DisposalReportProps> = ({
  file,
  onFileChange,
  label,
  subItemId,
}) => {
  const { maintenanceStore } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDisabled = !file || !subItemId || maintenanceStore.partialLoading;

  const handleClick = () => fileInputRef.current?.click();

  return (
    <RowFieldDiscardReport>
      <InputDisposalReportContainer onClick={handleClick} hasFile={!!file}>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,.pdf"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <Icon className="material-symbols-outlined" color="#3153DD">
          attachment
        </Icon>
        <Text variant="small" color={file ? '#fff' : '#3153DD'}>
          {file ? file.name.slice(0, 15) + '...' : label || 'Laudo de descarte'}
        </Text>
      </InputDisposalReportContainer>
      {file && subItemId && (
        <button
          style={{
            background: 'var(--color-border-success)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '4px 12px',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            opacity: isDisabled ? 0.6 : 1,
          }}
          onClick={async () => {
            if (isDisabled || !file || !subItemId) return;
            await maintenanceStore.sendDiscardReport(subItemId, file);
          }}
          disabled={isDisabled}
        >
          Confirmar
        </button>
      )}
    </RowFieldDiscardReport>
  );
};

export default DisposalReport;
