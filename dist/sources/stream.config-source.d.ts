import { Observable } from 'rxjs';
import { ConfigSource, ConfigSourceInitOptions } from '../types';
export interface StreamConfigSourceInitOptions extends ConfigSourceInitOptions {
    stream: Observable<any>;
}
export declare class StreamConfigSource implements ConfigSource {
    protected readonly options: StreamConfigSourceInitOptions;
    constructor(options: StreamConfigSourceInitOptions);
    init(): Promise<void>;
}
//# sourceMappingURL=stream.config-source.d.ts.map