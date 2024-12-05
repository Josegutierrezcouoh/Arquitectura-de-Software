'use client'

class EmployeeDAO {
    private _id?: number;
    private _name: string;
    private _email: string;
    private _phone: string;

    constructor(name: string, email: string, phone: string, id?: number) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    static async getAll(): Promise<EmployeeDAO[]> {
        return [
            new EmployeeDAO("Thomas Hardy", "thomashardy@mail.com", "(171) 555-2222", 1 ),
            new EmployeeDAO("Dominique Perrier", "dominiqueperrier@mail.com", "(313) 555-5735", 2 ),
            new EmployeeDAO("Maria Anders", "mariaanders@mail.com", "(503) 555-9931", 3 ),
            new EmployeeDAO("Fran Wilson", "franwilson@mail.com", "(206) 619-5731", 4 ),
            new EmployeeDAO("Martin Blank", "martinblank@mail.com", "(480) 631-2097", 5 )
        ]
    }

    static async get(id: number): Promise<EmployeeDAO> {
        return new EmployeeDAO('Employee', '' + id, '123456789', 1)
    }

    async add(): Promise<EmployeeDAO> {
        return this
    }

    async update(): Promise<EmployeeDAO> {
        return this
    }

    async delete(): Promise<void> {
        return
    }

    get id(): number | undefined {
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

export default EmployeeDAO