import { OnModuleDestroy } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigSource, ConfigSourceInitOptions, DynamicConfigOptions } from './types';
export declare class DynamicConfigService<Config> implements OnModuleDestroy {
    private readonly options;
    private readonly finalizers;
    private config$?;
    private logger;
    constructor(options: DynamicConfigOptions);
    config(): Promise<Config>;
    configStream(): Observable<Config>;
    createDataSource(options: ConfigSourceInitOptions): ConfigSource;
    onModuleDestroy(): Promise<void>;
    private init;
}
//# sourceMappingURL=dynamic-config.service.d.ts.map