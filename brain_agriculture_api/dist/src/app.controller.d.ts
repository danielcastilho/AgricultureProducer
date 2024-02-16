import { RuralProducerService } from "./modules/business/rural-producer/rural-producer.service";
import { RuralProducerModel } from "./modules/model/ruralProducerModel";
import { RuralProducerInputVM } from "./modules/model/viewModel/ruralProducerInputVM";
export declare class AppController {
    private readonly ruralProducerService;
    constructor(ruralProducerService: RuralProducerService);
    get(id: string): Promise<RuralProducerModel>;
    create(ruralProducerInput: RuralProducerInputVM): Promise<RuralProducerModel>;
    update(ruralProducerInput: RuralProducerInputVM): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
