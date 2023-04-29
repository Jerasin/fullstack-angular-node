import jwtDecode from 'jwt-decode';
import { SessionUser } from '../interfaces';

export function decodeToken(token: string): SessionUser {
  const decode: any = jwtDecode(token);

  const tokenSessionUser: SessionUser = {
    id: decode.id,
    email: decode.email,
    role: decode.role,
  };

  return tokenSessionUser;
}
