import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigOptionsToken } from './const';
import { DynamicConfigOptions } from './types';
import { DynamicConfigService } from './dynamic-config.service';

@Global()
@Module({})
export class DynamicConfigModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static forRoot<Config>(options: DynamicConfigOptions): DynamicModule {
    return {
      module: DynamicConfigModule,
      providers: [
        {
          provide: ConfigOptionsToken,
          useValue: options,
        },
        DynamicConfigService,
      ],
      exports: [DynamicConfigService],
    };
  }
}
