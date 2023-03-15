import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Param,
    Query,
    NotFoundException, Session
} from '@nestjs/common';
import { Delete, UseGuards } from '@nestjs/common/decorators';
import { CreateUserDto } from './dtos/create-user-dtos';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
// import { AuthGuard } from 'src/guards/auth.guard';
import { LoginUserDto } from './dtos/login-user-dto';
import { RolesGuard } from 'src/guards/roles-guard';
import { Roles } from './decorators/roles.decorator';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }


    @Get('/whoami')
    // @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user?: User) {
        return user?.role;
    }
    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }
    // Đăng ký
    @Post('/register')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.name, body.username, body.role, body.password);
        session.userId = user.id;
        return user;
    }
    //Đăng nhập
    @Post('/login')
    async signin(@Body() body: LoginUserDto, @Session() session: any) {

        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not Found !');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }
    @Get('/users')
    getAllUsers(User) {
        return this.usersService.find(User);
    }

    @Delete('/:id')
    @Roles('admin')
    async removeUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (user.role !== 'admin') {
            throw new NotFoundException('Only admin can remove users');
        }
        return this.usersService.remove(parseInt(id));
    }


    @Patch('/:id')
    @Roles('admin')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto, @CurrentUser() user: User) {
        if (user.role !== 'admin') {
            throw new NotFoundException('Only admin can update users');
        }
        return this.usersService.update(parseInt(id), body);
    }
}
