import express from 'express';
import { deleteUserById, getUsers, getUserById } from '../db/users';

// Controller to get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        // Retrieve all users from the database
        const users = await getUsers();

        // Send the list of users in the response with a 200 OK status
        return res.status(200).json(users);

    } catch (error) {
        // Log any errors that occur and send a 400 Bad Request status
        console.log(error);
        return res.sendStatus(400);
    }
};

// Controller to delete a user by ID
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        // Extract the user ID from the request parameters
        const { id } = req.params;

        // Delete the user with the specified ID from the database
        const deletedUser = await deleteUserById(id);

        // Send the deleted user object in the response
        return res.json(deletedUser);

    } catch (error) {
        // Log any errors that occur and send a 400 Bad Request status
        console.log(error);
        return res.sendStatus(400);
    }
};

// Controller to update a user by ID
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        // Extract the user ID from the request parameters and the new username from the request body
        const { id } = req.params;
        const { username } = req.body;

        // If the username is not provided, return a 400 Bad Request status
        if (!username) {
            return res.sendStatus(400);
        }

        // Retrieve the user with the specified ID from the database
        const user = await getUserById(id);

        // Update the user's username
        user.username = username;
        await user.save();

        // Send the updated user object in the response with a 200 OK status
        return res.status(200).json(user);

    } catch (error) {
        // Log any errors that occur and send a 400 Bad Request status
        console.log(error);
        return res.sendStatus(400);
    }
};
