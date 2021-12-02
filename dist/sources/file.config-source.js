"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileConfigSource = void 0;
const fs = __importStar(require("fs"));
const util = __importStar(require("util"));
const context = 'FileConfigSource';
const readFile = util.promisify(fs.readFile);
class FileConfigSource {
    constructor(options) {
        this.options = options;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { logger, configFilePath, addFinalizer, watch, onError, subject } = this.options;
            const startWatcher = () => __awaiter(this, void 0, void 0, function* () {
                logger.log('Watching for config file changes...', context);
                const chokidar = yield Promise.resolve().then(() => __importStar(require('chokidar')));
                const watcher = chokidar.watch(configFilePath, {
                    disableGlobbing: true,
                    usePolling: true,
                    interval: 3000,
                    binaryInterval: 3000,
                    followSymlinks: false,
                });
                watcher.on('change', pushConfig);
                addFinalizer(() => watcher.close());
            });
            const pushConfig = () => {
                this.readConfigFile()
                    .then(config => subject.next(config))
                    .catch(error => onError(error));
            };
            pushConfig();
            if (watch) {
                // Optionally watch for changes - we may not need this in some situations.
                yield startWatcher();
            }
        });
    }
    readConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const { configFilePath, logger } = this.options;
            if (!configFilePath) {
                throw new Error('configFilePath value is missing. Did you forget to set it in DynamicConfigOptions?');
            }
            logger.log(`Reading config file at '${configFilePath}'.`, context);
            return yield readFile(configFilePath, { encoding: 'utf8' });
        });
    }
}
exports.FileConfigSource = FileConfigSource;
//# sourceMappingURL=file.config-source.js.map