import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true},
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});
 
// Define the User model with Mongoose
export const UserModel = mongoose.model('User', UserSchema);

// Get all users
export const getUsers = () => UserModel.find();

// Find a user by email
export const getUsersByEmail = (email: string) => UserModel.findOne({ email });

// Find a user by session token
export const getUsersBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

// Find a user by ID
export const getUserById = (id: string) => UserModel.findById(id);

// Create a new user
export const createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then(user => user.toObject());

// Delete a user by ID
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

// Update a user by ID
export const updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values, { new: true }); 

