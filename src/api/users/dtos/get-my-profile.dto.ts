import { ResponseDto } from 'src/api/common/response.dto';
import { UserEntity } from '../entities/user.entity';

export interface GetMyProfile extends ResponseDto<{ data: UserEntity }> {}
