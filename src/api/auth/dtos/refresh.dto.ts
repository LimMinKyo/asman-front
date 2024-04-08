import { ResponseDto } from 'src/api/common/response.dto';

export interface RefreshResponse extends ResponseDto<{ accessToken: string }> {}
