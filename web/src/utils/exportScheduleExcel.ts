import * as XLSX from 'xlsx';

import type { ScheduleItem } from '../types/schedule-export.types';
import { formatDateTime, getStatusLabel } from './exportFormatters';

export const exportScheduleToExcel = async (
  data: ScheduleItem[],
): Promise<void> => {
  try {
    const formattedData = data.map((item) => ({
      'Data de Início': formatDateTime(item.startTime),
      'Data de Término': formatDateTime(item.endTime),
      Turno: item.classGroup?.shift || '-',
      Turma: item.classGroup?.code || '-',
      Disciplina: item.subject?.name || '-',
      Instrutor: item.professor?.name || '-',
      Sala: item.room?.name || '-',
      Status: getStatusLabel(item.status),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cronograma');
    XLSX.writeFile(workbook, 'cronograma_aulas.xlsx');
  } catch (error) {
    console.error('Erro ao exportar Excel:', error);
    throw new Error('Falha ao gerar o arquivo Excel.', { cause: error });
  }
};
