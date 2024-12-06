'use client'

import IndexedDBManager from "../datasources/db/IndexedDBManager";

class EmployeeDAO {
    private _id?: number;
    private _name: string;
    private _email: string;
    private _phone: string;

    private static db = new IndexedDBManager<{id?: number, _name: string, _email: string, _phone: string }>('EmployeeDB', 'employees');

    constructor(name: string, email: string, phone: string, id?: number) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    static async getAll(): Promise<EmployeeDAO[]> {
        const results = await this.db.getAll();
        return results.map(employee => new EmployeeDAO(employee._name, employee._email, employee._phone, employee.id))

        return [
            new EmployeeDAO("Thomas Hardy", "thomashardy@mail.com", "(171) 555-2222", 1 ),
            new EmployeeDAO("Dominique Perrier", "dominiqueperrier@mail.com", "(313) 555-5735", 2 ),
            new EmployeeDAO("Maria Anders", "mariaanders@mail.com", "(503) 555-9931", 3 ),
            new EmployeeDAO("Fran Wilson", "franwilson@mail.com", "(206) 619-5731", 4 ),
            new EmployeeDAO("Martin Blank", "martinblank@mail.com", "(480) 631-2097", 5 )
        ]
    }

    static async get(id: number): Promise<EmployeeDAO> {
        const result = await this.db.get(id);
        return new EmployeeDAO(result._name, result._email, result._phone, result.id)
    }

    async add(): Promise<EmployeeDAO> {
        const id = await EmployeeDAO.db.add({_name: this._name, _email: this._email, _phone: this._phone })
        this._id = id
        return this
    }

    async update(): Promise<void> {
        if (!this._id) {
            throw new Error('Employee not found')
        }
        await EmployeeDAO.db.update({id: this._id, _name: this._name, _email: this._email, _phone: this._phone })
    }

    async delete(): Promise<void> {
        if (!this._id) {
            throw new Error('Employee not found')
        }

        await EmployeeDAO.db.delete(this._id)
        return Promise.resolve()
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