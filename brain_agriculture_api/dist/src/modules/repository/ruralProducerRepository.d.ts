import { RuralProducerModel } from "../model/ruralProducerModel";
import { RepositoryBaseService } from "./repositorybase.service";
export declare class RuralProducerRepository extends RepositoryBaseService<RuralProducerModel> {
    create(data: RuralProducerModel): Promise<RuralProducerModel>;
    update(data: RuralProducerModel): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    byId(id: string): Promise<RuralProducerModel>;
}
