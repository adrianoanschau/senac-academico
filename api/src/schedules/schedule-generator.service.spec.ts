import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleGeneratorService } from './schedule-generator.service';
import { PrismaService } from '@/prisma/prisma.service';
import { OverrideType } from '@/prisma/generated';

describe('ScheduleGeneratorService', () => {
  let service: ScheduleGeneratorService;

  const mockPrisma = {
    scheduleOverride: {
      findMany: vi.fn(),
    },
  };

  beforeEach(async () => {
    // Arrange
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleGeneratorService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ScheduleGeneratorService>(ScheduleGeneratorService);
  });

  describe('generateProjections', () => {
    // Utilizamos `new Date(Ano, Mês, Dia)` (Mês é zero-based, 5 = Junho)
    // Assim garantimos que o teste gere os horários locais do servidor, ignorando problemas de fuso horário.
    const startDate = new Date(2026, 5, 15, 0, 0, 0); // 15 de Junho de 2026 (Segunda-feira)
    const daysOfWeek = [1, 3]; // Seg e Qua
    const startTimeStr = '08:00';
    const endTimeStr = '12:00'; // 4 horas por dia (240 min)
    const totalSubjectHours = 8; // 2 aulas necessárias

    const getExpectedDate = (day: number, hour: number) => {
      return new Date(2026, 5, day, hour, 0, 0);
    };

    it('deve gerar datas ignorando finais de semana e respeitando os dias da semana permitidos (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.scheduleOverride.findMany.mockResolvedValue([]);

      // Act
      const result = await service.generateProjections(
        startDate,
        daysOfWeek,
        startTimeStr,
        endTimeStr,
        totalSubjectHours,
      );

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].startTime).toEqual(getExpectedDate(15, 8)); // Segunda-feira, 08:00
      expect(result[1].startTime).toEqual(getExpectedDate(17, 8)); // Quarta-feira, 08:00
      expect(result[0].durationInMinutes).toBe(240);
    });

    it('deve pular os dias bloqueados por overrides do tipo BLOCK (Caminho Triste)', async () => {
      // Arrange
      mockPrisma.scheduleOverride.findMany.mockResolvedValue([
        {
          type: OverrideType.BLOCK,
          startTime: new Date(2026, 5, 15, 0, 0, 0),
          endTime: new Date(2026, 5, 15, 23, 59, 59), // Bloqueia a segunda-feira inicial
        },
      ]);

      // Act
      const result = await service.generateProjections(
        startDate,
        daysOfWeek,
        startTimeStr,
        endTimeStr,
        totalSubjectHours,
      );

      // Assert
      // Pula o dia 15 (Segunda) e joga para o dia 17 (Quarta) e dia 22 (Segunda da próxima semana)
      expect(result).toHaveLength(2);
      expect(result[0].startTime).toEqual(getExpectedDate(17, 8));
      expect(result[1].startTime).toEqual(getExpectedDate(22, 8));
    });

    it('deve permitir agendamento em dia diferente do usual se houver override do tipo EXTRA_DAY (Caminho Feliz)', async () => {
      // Arrange
      mockPrisma.scheduleOverride.findMany.mockResolvedValue([
        {
          type: OverrideType.EXTRA_DAY,
          startTime: new Date(2026, 5, 16, 0, 0, 0),
          endTime: new Date(2026, 5, 16, 23, 59, 59), // Libera a Terça-feira como dia de aula!
        },
      ]);

      // Act
      const result = await service.generateProjections(
        startDate,
        daysOfWeek,
        startTimeStr,
        endTimeStr,
        totalSubjectHours,
      );

      // Assert
      // Deve agendar normalmente no dia 15 (Segunda) e aproveitar o Extra Day no dia 16 (Terça)
      expect(result).toHaveLength(2);
      expect(result[0].startTime).toEqual(getExpectedDate(15, 8));
      expect(result[1].startTime).toEqual(getExpectedDate(16, 8));
    });
  });
});
