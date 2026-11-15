import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';

describe('AppController (System Health)', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Health Probe', () => {
    it('should return ok status with EIRENE platform identifiers', () => {
      const response = appController.checkHealth();
      expect(response).toBeDefined();
      expect(response.status).toBe('ok');
      expect(response.service).toBe('EIRENE Backend API');
      expect(response.version).toBe('1.0.0');
      expect(response.timestamp).toBeDefined();
      expect(typeof response.uptime).toBe('number');
    });
  });
});
