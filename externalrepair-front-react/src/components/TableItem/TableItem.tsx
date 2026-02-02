import { Fragment, useEffect, useState } from 'react';
import {
  ActionButtonConfigOptions,
  ActionButtonState,
  useActionButtonConfig,
} from '~/utils/hooks/useActionButtonConfig';
import Divider from '../Divider';
import {
  Container,
  EditIcon,
  EditableFieldCommonInput,
  EditableFieldCommonInputObservation,
  EditableFieldInput,
  EditableFieldWrapper,
  EditableFieldWrapperObservation,
  FieldColumn,
  FieldLabel,
  FieldValue,
  FieldsRow,
  FieldsRowExpanded,
  SaveButton,
  SaveButtonContainer,
  SaveIcon,
  SignalButton,
  SignalIcon,
  StyledInputMask,
  TableItemContainer,
} from './styles';
import {
  TableItemValidator,
  ValidationRule,
  errorStyle,
  errorTextStyle,
} from './validation';

interface TableItemField {
  key: string;
  label: string;
  editable?: boolean;
  type?: 'text' | 'number' | 'date';
  minWidth?: number;
  maxWidth?: number;
}

interface LogisticField {
  fleet: string;
  carrier: string;
  contact: string;
  plate: string;
  driver: string;
  observation: string;
}

const initialLogisticFields: LogisticField = {
  fleet: '',
  carrier: '',
  contact: '',
  plate: '',
  driver: '',
  observation: '',
};

interface TableItemProps {
  item: Record<string, any>;
  fields: TableItemField[];
  expandedFields?: TableItemField[];
  state: ActionButtonState;
  onSave: (values: Record<string, any>) => void;
  customText?: ActionButtonConfigOptions['customText'];
  customIcon?: ActionButtonConfigOptions['customIcon'];
  isLogistic?: boolean;
  validationRules?: ValidationRule[];
  itemStatus?: string;
}

const TableItem = ({
  item,
  fields,
  expandedFields,
  state,
  onSave,
  customText,
  customIcon,
  isLogistic,
  validationRules = [],
  itemStatus,
}: TableItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [values, setValues] = useState(() => ({ ...item }));
  const [logisticFields, setLogisticFields] = useState<LogisticField>(() => {
    if (isLogistic && item) {
      return {
        fleet: item.fleet || '',
        carrier: item.carrier || '',
        contact: item.contact || '',
        plate: item.plate || '',
        driver: item.driver || '',
        observation: item.observation || '',
      };
    }
    return initialLogisticFields;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isViewOnly = state.canOnlyView && !state.canEdit;
  const { icon, text } = useActionButtonConfig(state, {
    customText,
    customIcon,
  });

  const validator = new TableItemValidator(validationRules);

  useEffect(() => {
    if (!isLogistic) {
      setLogisticFields(initialLogisticFields);
    }
  }, [expanded, isLogistic]);

  const handleChange = (key: string, value: any) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);

    const fieldError = validator.validateSingleField(key, value, newValues);
    setErrors((prev) => ({
      ...prev,
      [key]: fieldError || '',
    }));
  };

  const handleLogisticChange = (key: string, value: any) => {
    setLogisticFields((prev) => ({ ...prev, [key]: value }));

    const fieldError = validator.validateSingleField(key, value, {
      ...values,
      ...logisticFields,
      [key]: value,
    });
    if (fieldError) {
      setErrors((prev) => ({
        ...prev,
        [key]: fieldError,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const formatValue = (value: any, fieldKey: string): string => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'number' && isNaN(value))
    ) {
      return '';
    }

    if (
      typeof value === 'number' &&
      (fieldKey === 'totalPrice' ||
        fieldKey === 'unitPrice' ||
        fieldKey === 'unitValue')
    ) {
      return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }
    return value?.toString() || '';
  };

  const getBorderColor = () => {
    if (!itemStatus) return undefined;

    const SUCCESS_COLOR = 'var(--color-success-green)';
    const statusColors = {
      received: SUCCESS_COLOR,
      assigned: SUCCESS_COLOR,
      finished: SUCCESS_COLOR,
      completed: SUCCESS_COLOR,
      none: '#cccccc',
    };

    return statusColors[itemStatus as keyof typeof statusColors] || undefined;
  };

  const fieldsToShow = expanded ? expandedFields || fields : fields;

  return (
    <Container>
      <TableItemContainer borderColor={getBorderColor()}>
        <FieldsRow>
          {fields.map((field) => (
            <FieldColumn
              key={field.key}
              width={'100%'}
              minWidth={field.minWidth}
              maxWidth={field.maxWidth}
            >
              <FieldLabel>{field.label}</FieldLabel>
              <FieldValue>{formatValue(item[field.key], field.key)}</FieldValue>
            </FieldColumn>
          ))}
        </FieldsRow>
        {expanded && (
          <Fragment>
            <FieldsRowExpanded>
              {fieldsToShow.map((field) => (
                <FieldColumn
                  key={field.key}
                  width={'100%'}
                  minWidth={field.minWidth}
                  maxWidth={field.maxWidth}
                >
                  <FieldLabel>{field.label}</FieldLabel>
                  {field.editable ? (
                    isViewOnly ? (
                      <FieldValue>
                        {formatValue(values[field.key], field.key)}
                      </FieldValue>
                    ) : (
                      <div>
                        <EditableFieldWrapper>
                          <EditableFieldInput
                            type={field.type || 'text'}
                            value={values[field.key] ?? ''}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleChange(field.key, e.target.value)}
                            style={{
                              borderColor: errors[field.key]
                                ? '#D32F2F'
                                : undefined,
                            }}
                          />
                          <EditIcon className="material-symbols-outlined">
                            edit
                          </EditIcon>
                        </EditableFieldWrapper>
                        {errors[field.key] && (
                          <div
                            style={{
                              color: '#D32F2F',
                              fontSize: '10px',
                              marginTop: '2px',
                              paddingLeft: '4px',
                            }}
                          >
                            {errors[field.key]}
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    <FieldValue>
                      {formatValue(values[field.key], field.key)}
                    </FieldValue>
                  )}
                </FieldColumn>
              ))}
            </FieldsRowExpanded>
            <Divider />
            {isLogistic && !isViewOnly && (
              <div
                style={{
                  display: 'flex',
                  padding: '20px 0 0 0',
                }}
              >
                {/* Bloco de campos logísticos */}
                <FieldsRowExpanded>
                  <FieldColumn width={'100%'} minWidth={158} maxWidth={158}>
                    <FieldLabel>Frota</FieldLabel>
                    {isViewOnly ? (
                      <FieldValue>{logisticFields.fleet || ''}</FieldValue>
                    ) : (
                      <>
                        <EditableFieldWrapper>
                          <select
                            style={{
                              height: 25,
                              width: '100%',
                              borderRadius: 4,
                              border: `1px solid ${errors.fleet ? '#D32F2F' : '#E0E0E0'}`,
                              color: logisticFields.fleet ? '#222' : '#b8b8b8',
                            }}
                            value={logisticFields.fleet}
                            onChange={(e) =>
                              handleLogisticChange('fleet', e.target.value)
                            }
                          >
                            <option value="">Selecione a frota</option>
                            <option value="Terceiro">Terceiro</option>
                            <option value="UISA">UISA</option>
                          </select>
                        </EditableFieldWrapper>
                        {errors.fleet && (
                          <div
                            style={{
                              color: '#D32F2F',
                              fontSize: '10px',
                              marginTop: '2px',
                              paddingLeft: '4px',
                            }}
                          >
                            {errors.fleet}
                          </div>
                        )}
                      </>
                    )}
                  </FieldColumn>
                  {logisticFields.fleet === 'Terceiro' && (
                    <>
                      <FieldColumn width={'100%'} maxWidth={158}>
                        <FieldLabel>Transportadora</FieldLabel>
                        {isViewOnly ? (
                          <FieldValue>
                            {logisticFields.carrier || ''}
                          </FieldValue>
                        ) : (
                          <>
                            <EditableFieldWrapper>
                              <EditableFieldCommonInput
                                type="text"
                                value={logisticFields.carrier}
                                onChange={(e) =>
                                  handleLogisticChange(
                                    'carrier',
                                    e.target.value,
                                  )
                                }
                                style={errors.carrier ? errorStyle : undefined}
                              />
                            </EditableFieldWrapper>
                            {errors.carrier && (
                              <div style={errorTextStyle}>{errors.carrier}</div>
                            )}
                          </>
                        )}
                      </FieldColumn>
                      <FieldColumn width={'100%'} maxWidth={158}>
                        <FieldLabel>Contato</FieldLabel>
                        {isViewOnly ? (
                          <FieldValue>
                            {logisticFields.contact || ''}
                          </FieldValue>
                        ) : (
                          <>
                            <EditableFieldWrapper>
                              <StyledInputMask
                                mask="(99) 99999-9999"
                                value={logisticFields.contact}
                                onChange={(e) =>
                                  handleLogisticChange(
                                    'contact',
                                    e.target.value,
                                  )
                                }
                                type="tel"
                                style={errors.contact ? errorStyle : undefined}
                              />
                            </EditableFieldWrapper>
                            {errors.contact && (
                              <div style={errorTextStyle}>{errors.contact}</div>
                            )}
                          </>
                        )}
                      </FieldColumn>
                      <FieldColumn width={'100%'} maxWidth={158}>
                        <FieldLabel>Placa</FieldLabel>
                        {isViewOnly ? (
                          <FieldValue>
                            {(logisticFields.plate || '').toUpperCase()}
                          </FieldValue>
                        ) : (
                          <>
                            <EditableFieldWrapper>
                              <EditableFieldCommonInput
                                type="text"
                                value={logisticFields.plate.toUpperCase()}
                                onChange={(e) =>
                                  handleLogisticChange('plate', e.target.value)
                                }
                                style={{
                                  borderColor: errors.plate
                                    ? '#D32F2F'
                                    : undefined,
                                }}
                              />
                            </EditableFieldWrapper>
                            {errors.plate && (
                              <div
                                style={{
                                  color: '#D32F2F',
                                  fontSize: '10px',
                                  marginTop: '2px',
                                  paddingLeft: '4px',
                                }}
                              >
                                {errors.plate}
                              </div>
                            )}
                          </>
                        )}
                      </FieldColumn>
                      <FieldColumn width={'100%'}>
                        <div style={{ display: 'flex', maxWidth: 108 }}>
                          <FieldLabel>Observação</FieldLabel>
                        </div>
                        {isViewOnly ? (
                          <FieldValue>
                            {logisticFields.observation || ''}
                          </FieldValue>
                        ) : (
                          <EditableFieldWrapperObservation>
                            <EditableFieldCommonInputObservation
                              value={logisticFields.observation}
                              onChange={(e) =>
                                handleLogisticChange(
                                  'observation',
                                  e.target.value,
                                )
                              }
                            />
                          </EditableFieldWrapperObservation>
                        )}
                      </FieldColumn>
                    </>
                  )}
                  {logisticFields.fleet === 'UISA' && (
                    <>
                      <FieldColumn width={'100%'} maxWidth={300}>
                        <FieldLabel>Motorista</FieldLabel>
                        {isViewOnly ? (
                          <FieldValue>{logisticFields.driver || ''}</FieldValue>
                        ) : (
                          <>
                            <EditableFieldWrapper>
                              <EditableFieldCommonInput
                                type="text"
                                value={logisticFields.driver}
                                onChange={(e) =>
                                  handleLogisticChange('driver', e.target.value)
                                }
                                style={errors.driver ? errorStyle : undefined}
                              />
                            </EditableFieldWrapper>
                            {errors.driver && (
                              <div style={errorTextStyle}>{errors.driver}</div>
                            )}
                          </>
                        )}
                      </FieldColumn>

                      <FieldColumn width={'100%'} maxWidth={158}>
                        <FieldLabel>Placa</FieldLabel>
                        {isViewOnly ? (
                          <FieldValue>
                            {(logisticFields.plate || '').toUpperCase()}
                          </FieldValue>
                        ) : (
                          <>
                            <EditableFieldWrapper>
                              <EditableFieldCommonInput
                                type="text"
                                value={logisticFields.plate.toUpperCase()}
                                onChange={(e) =>
                                  handleLogisticChange('plate', e.target.value)
                                }
                                style={{
                                  borderColor: errors.plate
                                    ? '#D32F2F'
                                    : undefined,
                                }}
                              />
                            </EditableFieldWrapper>
                            {errors.plate && (
                              <div
                                style={{
                                  color: '#D32F2F',
                                  fontSize: '10px',
                                  marginTop: '2px',
                                  paddingLeft: '4px',
                                }}
                              >
                                {errors.plate}
                              </div>
                            )}
                          </>
                        )}
                      </FieldColumn>

                      <FieldColumn width={'100%'}>
                        <div style={{ display: 'flex', maxWidth: 108 }}>
                          <FieldLabel>Observação</FieldLabel>
                        </div>
                        {isViewOnly ? (
                          <FieldValue>
                            {logisticFields.observation || ''}
                          </FieldValue>
                        ) : (
                          <EditableFieldWrapperObservation>
                            <EditableFieldCommonInputObservation
                              value={logisticFields.observation}
                              onChange={(e) =>
                                handleLogisticChange(
                                  'observation',
                                  e.target.value,
                                )
                              }
                            />
                          </EditableFieldWrapperObservation>
                        )}
                      </FieldColumn>
                    </>
                  )}
                </FieldsRowExpanded>
                {/* Fim do bloco de campos logísticos */}
                <Divider />
              </div>
            )}

            {!isViewOnly && (
              <SaveButtonContainer>
                <SaveButton
                  onClick={() => {
                    const allValues = { ...values, ...logisticFields };
                    const validationResult =
                      validator.validateAllFields(allValues);

                    if (!validationResult.isValid) {
                      setErrors(validationResult.errors);
                      return;
                    }

                    onSave(allValues);
                    setExpanded(false);
                    setErrors({});
                  }}
                >
                  <SaveIcon className="material-symbols-outlined">
                    download_done
                  </SaveIcon>{' '}
                  Salvar
                </SaveButton>
              </SaveButtonContainer>
            )}
          </Fragment>
        )}
      </TableItemContainer>
      {!expanded && (
        <SignalButton onClick={() => setExpanded(true)}>
          <SignalIcon className="material-symbols-outlined">{icon}</SignalIcon>
          {text}
        </SignalButton>
      )}
    </Container>
  );
};

export default TableItem;
