'use strict'

const UserModel = use('App/Models/User')

class UserController {
    async login({ request, auth }) {
        const { email, password } = request.all();
        await auth.attempt(email, password);
        try {
            return await auth.getUser()
        } catch (error) {
            response.send('Missing or invalid jwt token')
        }
    }
    async signup(args) {
        const { request, auth } = args;
        const { email, password } = request.all();
        const user = new UserModel()

        user.email = email;
        user.password = password;

        await user.save();
        return await this.login(args);
    }
}

module.exports = UserController
