import express from 'express';
import { getUsersByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';

// Handler for user login
export const login = async (req: express.Request, res: express.Response) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.sendStatus(400); // Bad Request if either is missing
        }

        // Retrieve the user by email, including the authentication fields
        const user = await getUsersByEmail(email).select('+authentication.salt +authentication.password');

        // Check if the user exists
        if (!user) {
            return res.sendStatus(400); // Bad Request if user is not found
        }

        // Compute the expected hash from the provided password and stored salt
        const expectedHash = authentication(user.authentication.salt, password);

        // Check if the computed hash matches the stored password hash
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403); // Forbidden if the hashes do not match
        }

        // Generate a new session token and assign it to the user
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        // Save the updated user document with the new session token
        await user.save();
        
        // Set a cookie with the session token
        res.cookie('KIYOON-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' }); 

        // Return the user details with a 200 OK status
        return res.status(200).json(user);

    } catch (error) {
        console.log(error); // Log any errors
        return res.sendStatus(400); // Return a 400 Bad Request status on error
    }
}

// Handler for user registration
export const register = async (req: express.Request, res: express.Response) => {
    try {
        // Extract email, password, and username from request body
        const { email, password, username } = req.body;
        
        // Check if email, password, and username are provided
        if(!email || !password || !username) {
            return res.sendStatus(400); // Bad Request if any of them is missing
        }

        // Check if a user with the provided email already exists
        const existingUser = await getUsersByEmail(email);

        // Return 400 Bad Request if a user with the email already exists
        if (existingUser) {
            return res.sendStatus(400);
        }

        // Generate a salt and hash the password
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        // Return the newly created user with a 200 OK status
        return res.status(200).json(user);
    } catch (error) {
        console.log(error); // Log any errors
        return res.sendStatus(400); // Return a 400 Bad Request status on error
    }
}
