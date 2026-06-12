import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface ScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  status?: string;
  subject?: { name: string; code?: string };
  professor?: { name: string };
  room?: { name: string };
  classGroup?: { code: string; shift?: string };
}

const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleString("pt-BR");
};

const getStatusLabel = (status?: string): string => {
  const statusMap: Record<string, string> = {
    PLANNED: "Planejada",
    SCHEDULED: "Agendada",
    COMPLETED: "Concluída",
    CANCELLED: "Cancelada",
  };
  return status ? statusMap[status] || status : "-";
};

export const exportScheduleToExcel = async (
  data: ScheduleItem[],
): Promise<void> => {
  try {
    const formattedData = data.map((item) => ({
      "Data de Início": formatDateTime(item.startTime),
      "Data de Término": formatDateTime(item.endTime),
      Turno: item.classGroup?.shift || "-",
      Turma: item.classGroup?.code || "-",
      Disciplina: item.subject?.name || "-",
      Instrutor: item.professor?.name || "-",
      Sala: item.room?.name || "-",
      Status: getStatusLabel(item.status),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cronograma");
    XLSX.writeFile(workbook, "cronograma_aulas.xlsx");
  } catch (error) {
    console.error("Erro ao exportar Excel:", error);
    throw new Error("Falha ao gerar o arquivo Excel.", { cause: error });
  }
};

export const exportScheduleToPDF = async (
  data: ScheduleItem[],
): Promise<void> => {
  try {
    const doc = new jsPDF("landscape");

    doc.setFontSize(16);
    doc.text("Relatório de Cronograma", 14, 15);
    doc.setFontSize(10);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, 22);

    const tableColumn = [
      "Data/Hora Início",
      "Data/Hora Término",
      "Turno",
      "Turma",
      "Disciplina",
      "Instrutor",
      "Sala",
      "Status",
    ];
    const tableRows = data.map((item) => [
      formatDateTime(item.startTime),
      formatDateTime(item.endTime),
      item.classGroup?.shift || "-",
      item.classGroup?.code || "-",
      item.subject?.name || "-",
      item.professor?.name || "-",
      item.room?.name || "-",
      getStatusLabel(item.status),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 74, 141] }, // Cor inspirada no brand senac-blue
    });

    doc.save("cronograma_aulas.pdf");
  } catch (error) {
    console.error("Erro ao exportar PDF:", error);
    throw new Error("Falha ao gerar o arquivo PDF.", { cause: error });
  }
};
