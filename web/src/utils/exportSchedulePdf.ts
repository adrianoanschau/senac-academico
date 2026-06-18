import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import type { ScheduleItem } from '../types/schedule-export.types';
import { formatDateTime, getStatusLabel } from './exportFormatters';

export const exportScheduleToPDF = async (
  data: ScheduleItem[],
): Promise<void> => {
  try {
    const doc = new jsPDF('landscape');

    doc.setFontSize(16);
    doc.text('Relatório de Cronograma', 14, 15);
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 22);

    const tableColumn = [
      'Data/Hora Início',
      'Data/Hora Término',
      'Turno',
      'Turma',
      'Disciplina',
      'Instrutor',
      'Sala',
      'Status',
    ];
    const tableRows = data.map((item) => [
      formatDateTime(item.startTime),
      formatDateTime(item.endTime),
      item.classGroup?.shift || '-',
      item.classGroup?.code || '-',
      item.subject?.name || '-',
      item.professor?.name || '-',
      item.room?.name || '-',
      getStatusLabel(item.status),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 74, 141] },
    });

    doc.save('cronograma_aulas.pdf');
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw new Error('Falha ao gerar o arquivo PDF.', { cause: error });
  }
};
