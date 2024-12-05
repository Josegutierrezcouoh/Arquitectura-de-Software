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
        return []
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

    get id(): number {
        return this.id;
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