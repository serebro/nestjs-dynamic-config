import { ConfigSource, ConfigSourceInitOptions } from '../types';
export interface FileConfigSourceInitOptions extends ConfigSourceInitOptions {
    configFilePath: string;
}
export declare class FileConfigSource implements ConfigSource {
    protected readonly options: FileConfigSourceInitOptions;
    constructor(options: FileConfigSourceInitOptions);
    init(): Promise<void>;
    private readConfigFile;
}
//# sourceMappingURL=file.config-source.d.ts.map