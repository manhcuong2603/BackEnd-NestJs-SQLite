import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: 'SECRET_KEY',
            signOptions: { expiresIn: '60s' },
        }),
    ],
})
export class AuthModule { }
