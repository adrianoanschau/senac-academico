import React, { useState } from "react";
import { FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import { CanAccess } from "./CanAccess";
import { alertDialog } from "../utils/dialog";
import { type ScheduleItem } from "../utils/exportUtils";

interface ExportButtonsProps {
  fetchData: () => Promise<ScheduleItem[]>;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ fetchData }) => {
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [isExportingExcel, setIsExportingExcel] = useState<boolean>(false);

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const data = await fetchData();
      if (!data || data.length === 0) {
        alertDialog(
          "Nenhum dado encontrado para exportar com os filtros atuais.",
        );
        return;
      }

      const { exportScheduleToPDF } = await import("../utils/exportUtils");
      await exportScheduleToPDF(data);
    } catch (error) {
      console.error(error);
      alertDialog("Erro ao exportar o relatório em PDF. Tente novamente.");
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExportingExcel(true);
    try {
      const data = await fetchData();
      if (!data || data.length === 0) {
        alertDialog(
          "Nenhum dado encontrado para exportar com os filtros atuais.",
        );
        return;
      }

      const { exportScheduleToExcel } = await import("../utils/exportUtils");
      await exportScheduleToExcel(data);
    } catch (error) {
      console.error(error);
      alertDialog("Erro ao exportar o relatório em Excel. Tente novamente.");
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <CanAccess roles={["ADMIN", "COORDINATOR"]}>
      <div className="flex items-center gap-3">
        <button
          onClick={handleExportPDF}
          disabled={isExportingPDF || isExportingExcel}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-rose-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
          title="Exportar PDF"
        >
          {isExportingPDF ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileText size={18} />
          )}
          <span className="hidden sm:inline text-sm">Exportar PDF</span>
        </button>
        <button
          onClick={handleExportExcel}
          disabled={isExportingPDF || isExportingExcel}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md shadow-emerald-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
          title="Exportar Excel"
        >
          {isExportingExcel ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileSpreadsheet size={18} />
          )}
          <span className="hidden sm:inline text-sm">Exportar Excel</span>
        </button>
      </div>
    </CanAccess>
  );
};
