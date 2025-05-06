import { Test, TestingModule } from '@nestjs/testing';
import { OptionalCategoriesService } from './optional-categories.service';

describe('OptionalCategoriesService', () => {
  let service: OptionalCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionalCategoriesService],
    }).compile();

    service = module.get<OptionalCategoriesService>(OptionalCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
