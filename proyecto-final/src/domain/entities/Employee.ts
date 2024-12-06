class Employee {
    private _id: number;
    private _name: string;
    private _email: string;
    private _phone: string;

    constructor(name: string, email: string, phone: string, id: number) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get phone(): string {
        return this._phone;
    }
}

export default Employee