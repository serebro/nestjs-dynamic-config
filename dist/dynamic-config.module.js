"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DynamicConfigModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicConfigModule = void 0;
const common_1 = require("@nestjs/common");
const const_1 = require("./const");
const dynamic_config_service_1 = require("./dynamic-config.service");
let DynamicConfigModule = DynamicConfigModule_1 = class DynamicConfigModule {
    static forRoot(options) {
        return {
            module: DynamicConfigModule_1,
            providers: [
                {
                    provide: const_1.ConfigOptionsToken,
                    useValue: options,
                },
                dynamic_config_service_1.DynamicConfigService,
            ],
            exports: [dynamic_config_service_1.DynamicConfigService],
        };
    }
};
DynamicConfigModule = DynamicConfigModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], DynamicConfigModule);
exports.DynamicConfigModule = DynamicConfigModule;
//# sourceMappingURL=dynamic-config.module.js.map