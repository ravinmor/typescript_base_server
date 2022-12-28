import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  async index(request: Request, response: Response) {
    const id = request.params.id;

    const createUserService = new UserService();
    const result = await createUserService.getUserById(id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  } 

  async getUserByEmail(request: Request, response: Response) {
    const { email } = request.body

    const createUserService = new UserService();
    const result = await createUserService.getUserByEmail(email);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    
    return response.json(result);
  }

  async createUser(request: Request, response: Response) {
    const {
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
    } = request.body;

    const createUserService = new UserService();
    const result = await createUserService.createUser({
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
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }

  async updateUser(request: Request, response: Response) {
    const id = request.params.id;
    const {
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
      type
    } = request.body;

    const createUserService = new UserService();
    const result = await createUserService.updateUserById({
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
      type
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  } 

  async deleteUser(request: Request, response: Response) {
    const id = request.params.id;

    const createUserService = new UserService();
    const result = await createUserService.deleteUserById(id)
    return response.json(result);
  } 
}
