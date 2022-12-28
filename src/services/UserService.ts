import { hash } from "bcryptjs";
import { DeleteResult, getRepository } from "typeorm";
import { Address } from "../entities/Address";
import { User } from "../entities/User";
import { AddressRepository, UserRepository } from "../repositories";

type ParamsToStoreUser = {
	username: string,
	lastname: string,
	email: string,
	dateOfBirth: string,
	zipcode: string | null,
	street: string,
  streetNumber: string | null,
	number: string,
	building: string | null,
	floor: string | null,
	neighborhood: string,
	county: string,
	state: string,
	country: string,
	type: string | null,
	password: string,
};

type ParamsToUpdateUser = {
  id: string
	username: string,
	lastname: string,
	email: string,
	dateOfBirth: string,
	zipcode: string | null,
	street: string,
  streetNumber: string | null,
	number: string,
	building: string | null,
	floor: string | null,
	neighborhood: string,
	county: string,
	state: string,
	country: string,
	type: string | null,
};

export class UserService {
  async getUserById(id: string): Promise<User | Error> {
    const user = await UserRepository().find({
      where: {
        id: id
      },
      select: [ 'id', 'username', 'lastname', 'email', 'dateOfBirth', 'created_at', 'updated_at' ],
      relations: ['addresses']
    });

    if (!user[0]) {
      return new Error("User does not exists");
    }

    return user[0];
  } 

  async getUserByEmail(email: string): Promise<User | Error> {
    const user = await UserRepository().find({
      where: {
        email: email
      },
      select: [ 'id', 'username', 'lastname', 'email', 'dateOfBirth', 'created_at', 'updated_at' ],
      relations: ['addresses']
    });

    if (!user[0]) {
      return new Error("User does not exists");
    }

    return user[0];
  }

  async createUser({
    username,
    lastname,
    email,
    dateOfBirth,
    zipcode,
    street,
    streetNumber,
    number,
    building,
    floor,
    neighborhood,
    county,
    state,
    country,
    type,
    password
  }: ParamsToStoreUser): Promise<Error | User> {
    const existUser = await UserRepository().findOne({ email });

    if (existUser) {
      return new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = UserRepository().create({
      username,
      lastname,
      email,
      dateOfBirth,
      password: passwordHash
    });

    const userAddress = AddressRepository().create({
      userId: user.id,
      zipcode,
      street,
      streetNumber,
      number,
      building,
      floor,
      neighborhood,
      county,
      state,
      country,
      type,
    });

    await UserRepository().save(user);
    await AddressRepository().save(userAddress);

    const userToReturn = await UserRepository().find({
      where: {
        id: user.id
      },
      select: [ 'id', 'username', 'lastname', 'email', 'dateOfBirth', 'created_at', 'updated_at' ],
      relations: ['addresses']
    });

    return userToReturn[0];
  }

  async updateUserById({
    id,
    username,
    lastname,
    email,
    dateOfBirth,
    zipcode,
    street,
    streetNumber,
    number,
    building,
    floor,
    neighborhood,
    county,
    state,
    country,
    type,
  }: ParamsToUpdateUser): Promise<User | Error> {
    const user = await UserRepository().findOne({ id });

    if (!user) {
      return new Error("User does not exists");
    }

    user.username    = username;
    user.lastname    = lastname;
    user.email       = email;
    user.dateOfBirth = dateOfBirth;

    const usuarioAtualizado = await UserRepository().save(user);

    const address = await AddressRepository().findOne({ userId: usuarioAtualizado.id });

    address.zipcode      = zipcode;
    address.street       = street;
    address.streetNumber = streetNumber;
    address.number       = number;
    address.building     = building;
    address.floor        = floor;
    address.neighborhood = neighborhood;
    address.county       = county;
    address.state        = state;
    address.country      = country;
    address.type         = type;


    await AddressRepository().save(address);

    const userToReturn = await UserRepository().find({
      where: {
        id: usuarioAtualizado.id
      },
      select: [ 'id', 'username', 'lastname', 'email', 'dateOfBirth', 'created_at', 'updated_at' ],
      relations: ['addresses']
    });

    return userToReturn[0];
  } 

  async deleteUserById(id: string): Promise<boolean> {
    const addressDeleted = await AddressRepository().delete({ userId: id });
    const usuarioDeletado = await UserRepository().delete({id});

    return usuarioDeletado.affected == 1;
  } 
}
