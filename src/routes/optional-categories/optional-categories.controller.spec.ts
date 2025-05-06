import { Test, TestingModule } from '@nestjs/testing';
import { OptionalCategoriesController } from './optional-categories.controller';
import { OptionalCategoriesService } from './optional-categories.service';

describe('OptionalCategoriesController', () => {
  let controller: OptionalCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionalCategoriesController],
      providers: [OptionalCategoriesService],
    }).compile();

    controller = module.get<OptionalCategoriesController>(OptionalCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
