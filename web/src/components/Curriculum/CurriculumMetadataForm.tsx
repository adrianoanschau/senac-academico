import React from 'react';

import type { Course, CurriculumForm } from '../../types/entities';
import { Select } from '../Select';
import {
  type AccentPreset,
  FormActions,
  FormField,
  FormInput,
  getFormControlClass,
} from '../ui';

interface CurriculumMetadataFormProps {
  formData: CurriculumForm;
  onChange: (data: CurriculumForm) => void;
  courses: Course[];
  isEditing?: boolean;
  isSaving?: boolean;
  accent?: AccentPreset;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export const CurriculumMetadataForm: React.FC<CurriculumMetadataFormProps> = ({
  formData,
  onChange,
  courses,
  isEditing = false,
  isSaving = false,
  accent = 'matriz',
  onSubmit,
  onCancel,
  submitLabel,
}) => {
  const selectClassName = `${getFormControlClass(accent)} cursor-pointer`;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormField label="Nome da Grade">
        <FormInput
          accent={accent}
          required
          value={formData.name}
          onChange={(e) => onChange({ ...formData, name: e.target.value })}
          placeholder="Ex: Grade 2024 - Manhã"
        />
      </FormField>

      <FormField label="Curso Vinculado">
        <Select
          required
          value={formData.courseId}
          onChange={(e) => onChange({ ...formData, courseId: e.target.value })}
          className={selectClassName}
        >
          <option value="">Selecione um curso...</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Status">
        <Select
          value={formData.active ? 'true' : 'false'}
          onChange={(e) =>
            onChange({
              ...formData,
              active: e.target.value === 'true',
            })
          }
          className={selectClassName}
        >
          <option value="true">Ativa</option>
          <option value="false">Inativa</option>
        </Select>
      </FormField>

      {!isEditing && (
        <p className="text-sm text-slate-500 bg-slate-50 rounded-xl p-3">
          Após criar, você será direcionado para adicionar as disciplinas da
          grade.
        </p>
      )}

      <FormActions
        accent={accent}
        isSaving={isSaving}
        submitLabel={
          submitLabel ?? (isEditing ? 'Salvar' : 'Criar e Continuar')
        }
        onCancel={onCancel}
      />
    </form>
  );
};
