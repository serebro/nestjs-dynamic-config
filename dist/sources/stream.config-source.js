"use strict";
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
exports.StreamConfigSource = void 0;
const operators_1 = require("rxjs/operators");
const context = 'StreamConfigSource';
class StreamConfigSource {
    constructor(options) {
        this.options = options;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const { logger, subject, onError, watch, addFinalizer, stream } = this.options;
            if (!watch) {
                const value = yield stream.pipe((0, operators_1.first)()).toPromise();
                subject.next(value);
                subject.complete();
                return;
            }
            logger.log('Watching for config stream changes...', context);
            const subscription = stream.subscribe(value => subject.next(value), error => onError(error), () => subject.complete());
            addFinalizer(() => {
                subscription.unsubscribe();
            });
        });
    }
}
exports.StreamConfigSource = StreamConfigSource;
//# sourceMappingURL=stream.config-source.js.map