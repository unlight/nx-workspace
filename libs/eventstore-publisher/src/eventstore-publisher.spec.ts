import { Test, TestingModule } from '@nestjs/testing';

import { EVENTSTORE_CLIENT_OPTIONS } from './eventstore-publisher.constants';

describe('eventstore-publisher', () => {
  let module: TestingModule;
  let exampleService: ExampleService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: EXAMPLE_OPTIONS_TOKEN,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    exampleService = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(exampleService).toBeDefined();
  });
});
