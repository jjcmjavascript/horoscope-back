import { RespositoryId } from '@shared/types/commons.interface';

export interface HoroscopeRepositoryParams {
  where?: {
    id?: RespositoryId;
    horoscopeId?: RespositoryId;
  };
}
