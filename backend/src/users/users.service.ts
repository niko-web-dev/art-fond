import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id])
        user.roles = [role];
        return user;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll({include: {all: true}, attributes: {exclude: ['password']}});
        return users;
    }

    async getOneUser(id: number) {
        const singleUser = await this.userRepository.findOne({
            where: {id},
            include: {all: true},
            attributes: {exclude: ['password']}
        });
        return singleUser;
    }

    async getUsersByEmail(email: string) {
        const checkUser = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return checkUser
    }

    async getUsersByLogin(login: string) {
        const checkUser = await this.userRepository.findOne({where: {login}, include: {all: true}});
        return checkUser
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id)
            return dto;
        }
        throw new HttpException('user or role not found', HttpStatus.NOT_FOUND)
    }

    async deleteRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$remove('role', role.id)
            return dto;
        }
        throw new HttpException('user or role not found', HttpStatus.NOT_FOUND)
    }
}
