export class User {
    // constructor so we can create user with 'new User'
    constructor(
        public email: string,
        public id: string,
        private _token: string, // private, check validity (get()) but not get access
        private _tokenExpirationDate: Date // private, check validity (get()) but not get access
    ) {}

    // get (getter) is a "special property"; accessit as: user.token, not as a function
    // as a getter, user.token = something, can't be done
    get token() {
        if ( !this._tokenExpirationDate || new Date() > this._tokenExpirationDate ) { // if exists and if not expired
            return null;
        }
        return this._token;
    }
}
