const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleString('pt-BR');
};

const getStatusLabel = (status?: string): string => {
  const statusMap: Record<string, string> = {
    PLANNED: 'Planejada',
    SCHEDULED: 'Agendada',
    COMPLETED: 'Concluída',
    CANCELLED: 'Cancelada',
  };
  return status ? statusMap[status] || status : '-';
};

export { formatDateTime, getStatusLabel };
