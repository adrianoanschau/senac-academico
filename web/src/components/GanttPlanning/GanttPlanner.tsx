import React, { useRef } from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import type { Task } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import './ganttStyles.css';
import type { GanttBlueprintResult } from '../../types/gantt.types';
import { GanttTaskListHeader } from './GanttTaskListHeader';
import { usePortugueseWeekLabels } from './usePortugueseWeekLabels';

interface GanttPlannerProps {
  blueprint: GanttBlueprintResult;
  isRecalculating: boolean;
  onTaskDateChange: (taskId: string, newStart: Date) => void;
  isFullscreen?: boolean;
}

const LIST_CELL_WIDTH = '200px';
const ROW_HEIGHT = 52;

function toGanttTasks(blueprint: GanttBlueprintResult): Task[] {
  const conflictTaskIds = new Set(
    blueprint.conflicts.flatMap((c) => c.taskIds),
  );

  return blueprint.tasks.map((task) => {
    const hasConflict = conflictTaskIds.has(task.curriculumSubjectId);
    return {
      id: task.curriculumSubjectId,
      name: `${task.subjectCode}: ${task.subjectName} (${task.hours}h)`,
      start: new Date(task.start),
      end: new Date(task.end),
      type: 'task',
      progress: 0,
      dependencies: task.dependsOnId ? [task.dependsOnId] : [],
      styles: {
        backgroundColor: hasConflict ? '#fecaca' : '#93c5fd',
        backgroundSelectedColor: hasConflict ? '#f87171' : '#3b82f6',
        progressColor: hasConflict ? '#ef4444' : '#2563eb',
        progressSelectedColor: hasConflict ? '#dc2626' : '#1d4ed8',
      },
    };
  });
}

export const GanttPlanner: React.FC<GanttPlannerProps> = ({
  blueprint,
  isRecalculating,
  onTaskDateChange,
  isFullscreen = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tasks = toGanttTasks(blueprint);

  usePortugueseWeekLabels(containerRef);

  const chartHeight = isFullscreen
    ? Math.max(640, tasks.length * (ROW_HEIGHT + 4) + 120)
    : Math.max(560, tasks.length * (ROW_HEIGHT + 4) + 100);

  const handleDateChange = (task: Task) => {
    onTaskDateChange(task.id, task.start);
    return true;
  };

  return (
    <div
      ref={containerRef}
      className="gantt-planning-wrapper relative w-full overflow-x-auto rounded-xl border border-slate-100"
    >
      {isRecalculating && (
        <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center rounded-xl">
          <p className="text-sm font-bold text-slate-600">Recalculando dependências...</p>
        </div>
      )}
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Week}
        locale="pt-BR"
        listCellWidth={LIST_CELL_WIDTH}
        columnWidth={72}
        rowHeight={ROW_HEIGHT}
        headerHeight={56}
        ganttHeight={chartHeight}
        fontSize="13px"
        TaskListHeader={GanttTaskListHeader}
        onDateChange={handleDateChange}
        onProgressChange={() => false}
        onDelete={() => false}
      />
    </div>
  );
};
