import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CustomerService } from 'src/Application/services/customer.service';
import { Roles } from './decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private customerService: CustomerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.headers?.['user'];

    if (!user)
      throw new UnauthorizedException(
        'Acesso restrito só para administradores',
      );

    const isAdm = await this.customerService.getCheckIsAdmin(Number(user));

    if (!isAdm)
      throw new UnauthorizedException(
        'Acesso restrito só para administradores',
      );
    return isAdm;
  }
}
