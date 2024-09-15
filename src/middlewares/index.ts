import express from 'express';
import { get, merge } from 'lodash'; 
import { getUsersBySessionToken } from '../db/users';

// Middleware to check if the current user is the owner of account
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Extract the resource ID from request parameters
        const { id } = req.params;

        // Retrieve the current user's ID from the request object
        const currentUserId = get(req, 'identity._id') as string;

        // If the current user ID is not present, return a 403 Forbidden status
        if (!currentUserId) {
            return res.sendStatus(403);
        }

        // If the current user ID does not match the resource ID, return a 403 Forbidden status
        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        // If ownership is confirmed, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log any errors that occur and return a 400 Bad Request status
        console.log(error);
        return res.sendStatus(400);
    }
}; 

// Middleware to check if a user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Retrieve the session token from cookies
        const sessionToken = req.cookies['KIYOON-AUTH'];

        // If no session token is present, return a 403 Forbidden status
        if (!sessionToken) {
            return res.sendStatus(403);
        }

        // Fetch the user associated with the session token
        const existingUser = await getUsersBySessionToken(sessionToken);

        // If no user is found, return a 403 Forbidden status
        if (!existingUser) {
            return res.sendStatus(403);
        }

        // Attach the user object to the request object for further use
        merge(req, { identity: existingUser });

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Log any errors that occur and return a 400 Bad Request status
        console.log(error);
        return res.sendStatus(400);
    }
};
