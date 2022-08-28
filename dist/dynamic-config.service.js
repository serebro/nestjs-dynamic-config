"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.DynamicConfigService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const utils_1 = require("./utils");
const const_1 = require("./const");
const sources_1 = require("./sources");
const context = 'ConfigService';
let DynamicConfigService = class DynamicConfigService {
    constructor(options) {
        this.options = options;
        this.finalizers = [];
        this.logger = this.options.logger || common_1.Logger;
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, rxjs_1.firstValueFrom)(this.configStream().pipe((0, operators_1.first)()));
        });
    }
    configStream() {
        return this.config$ || this.init();
    }
    createDataSource(options) {
        switch (this.options.source) {
            case const_1.DynamicConfigSource.FILE:
                return new sources_1.FileConfigSource(Object.assign(Object.assign({}, options), { configFilePath: this.options.configFilePath }));
            case const_1.DynamicConfigSource.STREAM:
                return new sources_1.StreamConfigSource(Object.assign(Object.assign({}, options), { stream: this.options.configStream }));
            default:
                throw new Error(`Invalid DynamicConfigSource '${options.source}'.`);
        }
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const finalizer of this.finalizers) {
                yield Promise.resolve(finalizer());
            }
            this.finalizers.splice(0, this.finalizers.length);
            this.config$ = undefined;
        });
    }
    init() {
        var _a;
        const { watchForChanges } = this.options;
        this.logger.log('Initializing configuration service', context);
        const subject = new rxjs_1.BehaviorSubject(undefined);
        const dataSource = this.createDataSource({
            logger: this.logger,
            addFinalizer: finalizer => this.finalizers.push(finalizer),
            subject,
            onError: (_a = this.options.onError) !== null && _a !== void 0 ? _a : (error => subject.error(error)),
            watch: watchForChanges,
        });
        dataSource.init().catch((err) => subject.error(err));
        this.finalizers.push(() => {
            subject.complete();
            subject.unsubscribe();
        });
        return this.config$ = subject.pipe((0, operators_1.filter)(utils_1.isNotNil), (0, operators_1.map)(config => this.options.parseConfig(config)));
    }
};
DynamicConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(const_1.ConfigOptionsToken)),
    __metadata("design:paramtypes", [Object])
], DynamicConfigService);
exports.DynamicConfigService = DynamicConfigService;
//# sourceMappingURL=dynamic-config.service.js.map