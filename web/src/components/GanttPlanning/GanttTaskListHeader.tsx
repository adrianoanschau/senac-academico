import React from 'react';

interface GanttTaskListHeaderProps {
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}

export const GanttTaskListHeader: React.FC<GanttTaskListHeaderProps> = ({
  headerHeight,
  rowWidth,
  fontFamily,
  fontSize,
}) => (
  <div
    className="gantt-table-header-pt"
    style={{ fontFamily, fontSize, display: 'table', borderBottom: '1px solid #e6e4e4', borderTop: '1px solid #e6e4e4', borderLeft: '1px solid #e6e4e4', width: '100%' }}
  >
    <div style={{ display: 'table-row', height: headerHeight - 2 }}>
      <div style={{ display: 'table-cell', verticalAlign: 'middle', minWidth: rowWidth, paddingLeft: 8, fontWeight: 700, color: '#475569' }}>
        Disciplina
      </div>
      <div style={{ display: 'table-cell', width: 1, background: '#c4c4c4', opacity: 0.6, height: headerHeight * 0.5, marginTop: headerHeight * 0.2 }} />
      <div style={{ display: 'table-cell', verticalAlign: 'middle', minWidth: rowWidth, paddingLeft: 8, fontWeight: 700, color: '#475569' }}>
        Início
      </div>
      <div style={{ display: 'table-cell', width: 1, background: '#c4c4c4', opacity: 0.6 }} />
      <div style={{ display: 'table-cell', verticalAlign: 'middle', minWidth: rowWidth, paddingLeft: 8, fontWeight: 700, color: '#475569' }}>
        Término
      </div>
    </div>
  </div>
);
