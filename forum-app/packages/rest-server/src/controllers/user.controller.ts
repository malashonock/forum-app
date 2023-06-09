import { UserFields } from '@shared/types';

import UserRepository from '../repo/User.repo';
import { Request, Response } from '../types';
import { User } from '../persistence/entities';

const registerUser = async (req: Request<UserFields>, res: Response<User>) => {
  try {
    const { name } = req.body;

    const existingUser = await UserRepository.getUserByName(name);
    if (existingUser) {
      return res.status(400).send('User with specified name already exists');
    }

    const createdUser = await UserRepository.createUser(req.body);
    res.json(createdUser);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

const updateUser = async (
  req: Request<Partial<UserFields>>,
  res: Response<User>,
) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(404).send('User not found');
    }

    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      return res
        .status(304)
        .send('No updatable fields were provided in the request');
    }

    const updatedUser = await UserRepository.updateUser(userId, req.body);

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
};

export default {
  registerUser,
  updateUser,
};
