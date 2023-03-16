import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategy/jwt.stragety';
import { UsersController } from './users.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: 'super-secret-cat',
            // signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UsersController],
    providers: [AuthService, JWTStrategy]
})
export class AuthModule { }
