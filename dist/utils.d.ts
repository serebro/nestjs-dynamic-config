export declare const getVar: (source: any, sourceName?: string, isRequired?: boolean) => <Result = string>(name: string, defaultValue?: Result | undefined) => Result;
export declare const getEnv: <Result = string>(name: string, defaultValue?: Result | undefined) => Result;
export declare const isTruthy: (value: string) => boolean;
export declare const isNotNil: <T>(value: T | null | undefined) => value is T;
//# sourceMappingURL=utils.d.ts.map