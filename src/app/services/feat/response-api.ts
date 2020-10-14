import { Role } from 'src/app/enums/role.enum';

export interface ResponseApi {
  success: string;
  status: number;
  data: {};
  page: number;
  size: number;
}
