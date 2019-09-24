import { Test, TestingModule } from '@nestjs/testing';
import { OperatorController } from './operator.controller';

describe('Operator Controller', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OperatorController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OperatorController = module.get<OperatorController>(OperatorController);
    expect(controller).toBeDefined();
  });
});
