export interface ValidationRule {
  field: string;
  required?: boolean;
  type?: 'number' | 'date' | 'text';
  min?: number;
  max?: number;
  message?: string;
  customValidation?: (
    value: any,
    allValues: Record<string, any>,
  ) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class TableItemValidator {
  private validationRules: ValidationRule[];

  constructor(validationRules: ValidationRule[] = []) {
    this.validationRules = validationRules;
  }

  private validateRequired(
    field: string,
    value: any,
    message?: string,
  ): string | null {
    if (!value || value.toString().trim() === '') {
      return message || `${field} é obrigatório`;
    }
    return null;
  }

  private validateNumber(
    field: string,
    value: any,
    min?: number,
    max?: number,
  ): string | null {
    const numValue = Number(value);
    if (isNaN(numValue)) return `${field} deve ser um número`;
    if (min !== undefined && numValue < min) {
      return `${field} deve ser maior ou igual a ${min}`;
    }
    if (max !== undefined && numValue > max) {
      return `${field} deve ser menor ou igual a ${max}`;
    }
    return null;
  }

  private validateDate(field: string, value: any): string | null {
    const dateValue = new Date(value);
    if (isNaN(dateValue.getTime())) {
      return `${field} deve ser uma data válida`;
    }
    return null;
  }

  private validateField(
    field: string,
    value: any,
    allValues: Record<string, any>,
  ): string | null {
    const rule = this.validationRules.find((r) => r.field === field);
    if (!rule) return null;

    // Required validation
    if (rule.required) {
      const requiredError = this.validateRequired(field, value, rule.message);
      if (requiredError) return requiredError;
    }

    // Custom validation (run even if empty for conditional validation)
    if (rule.customValidation) {
      return rule.customValidation(value, allValues);
    }

    // Skip other validations if empty and not required
    if (!value || value.toString().trim() === '') return null;

    // Type validations
    if (rule.type === 'number') {
      return this.validateNumber(field, value, rule.min, rule.max);
    }

    if (rule.type === 'date') {
      return this.validateDate(field, value);
    }

    return null;
  }

  public validateAllFields(
    valuesToValidate: Record<string, any>,
  ): ValidationResult {
    const errors: Record<string, string> = {};

    this.validationRules.forEach((rule) => {
      const error = this.validateField(
        rule.field,
        valuesToValidate[rule.field],
        valuesToValidate,
      );
      if (error) {
        errors[rule.field] = error;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  public validateSingleField(
    field: string,
    value: any,
    allValues: Record<string, any>,
  ): string | null {
    return this.validateField(field, value, allValues);
  }
}

// Validações específicas para diferentes módulos
export const createLogisticsValidationRules = (): ValidationRule[] => [
  {
    field: 'fleet',
    required: true,
    message: 'Selecione o tipo de frota',
  },
  {
    field: 'carrier',
    required: false,
    customValidation: (value: any, allValues: Record<string, any>) => {
      if (
        (allValues.fleet === 'Terceiro' || allValues.fleet === 'external') &&
        (!value || value.trim() === '')
      ) {
        return 'Transportadora é obrigatória para frota terceiro';
      }
      return null;
    },
  },
  {
    field: 'contact',
    required: false,
    customValidation: (value: any, allValues: Record<string, any>) => {
      if (
        (allValues.fleet === 'Terceiro' || allValues.fleet === 'external') &&
        (!value || value.trim() === '')
      ) {
        return 'Contato é obrigatório para frota terceiro';
      }
      return null;
    },
  },
  {
    field: 'driver',
    required: false,
    customValidation: (value: any, allValues: Record<string, any>) => {
      if (allValues.fleet === 'UISA' && (!value || value.trim() === '')) {
        return 'Motorista é obrigatório para frota UISA';
      }
      return null;
    },
  },
  {
    field: 'plate',
    required: true,
    message: 'Placa é obrigatória',
  },
];

export const createAlmoxarifadoValidationRules = (): ValidationRule[] => [
  {
    field: 'receivedQuantity',
    required: true,
    type: 'number' as const,
    min: 1,
    message: 'Quantidade recebida é obrigatória e deve ser maior que 0',
  },
  {
    field: 'receiptDate',
    required: true,
    type: 'date' as const,
    message: 'Data de recebimento é obrigatória',
  },
];

export const createCounterpartyValidationRules = (): ValidationRule[] => [
  {
    field: 'counterpartyName',
    required: true,
    message: 'Nome da contraparte é obrigatório',
  },
  {
    field: 'counterpartyEmail',
    required: true,
    message: 'Email da contraparte é obrigatório',
    customValidation: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Email deve ter um formato válido';
      }
      return null;
    },
  },
  {
    field: 'counterpartyPhone',
    required: false,
    message: 'Telefone da contraparte é opcional',
  },
  {
    field: 'counterpartyAddress',
    required: false,
    message: 'Endereço da contraparte é opcional',
  },
  {
    field: 'counterpartyDocument',
    required: false,
    message: 'Documento da contraparte é opcional',
  },
  {
    field: 'counterpartyType',
    required: true,
    message: 'Tipo da contraparte é obrigatório',
  },
  {
    field: 'counterpartyNotes',
    required: false,
    message: 'Observações da contraparte são opcionais',
  },
];

export const createTechnicalManagerValidationRules = (): ValidationRule[] => [
  {
    field: 'technicalManagerName',
    required: true,
    message: 'Nome do gestor técnico é obrigatório',
  },
  {
    field: 'technicalManagerEmail',
    required: true,
    message: 'Email do gestor técnico é obrigatório',
    customValidation: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Email deve ter um formato válido';
      }
      return null;
    },
  },
  {
    field: 'technicalManagerPhone',
    required: false,
    message: 'Telefone do gestor técnico é opcional',
  },
  {
    field: 'technicalManagerDepartment',
    required: true,
    message: 'Departamento do gestor técnico é obrigatório',
  },
  {
    field: 'technicalManagerRole',
    required: true,
    message: 'Cargo do gestor técnico é obrigatório',
  },
  {
    field: 'technicalManagerNotes',
    required: false,
    message: 'Observações do gestor técnico são opcionais',
  },
];

// Estilos para feedback visual
export const errorStyle = {
  borderColor: '#D32F2F',
  borderWidth: '2px',
  transition: 'border-color 0.2s ease, border-width 0.2s ease',
} as const;

export const errorTextStyle = {
  color: '#D32F2F',
  fontSize: '10px',
  marginTop: '2px',
  paddingLeft: '4px',
} as const;
