/**
 * Represents an employee.
 */
class Employee {
    private _id: number;
    private _name: string;
    private _email: string;
    private _phone: string;

     /**
     * Creates an instance of Employee.
     * @param name - The name of the employee.
     * @param email - The email of the employee.
     * @param phone - The phone number of the employee.
     * @param id - The ID of the employee.
     */
    constructor(name: string, email: string, phone: string, id: number) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    /**
     * Gets the ID of the employee.
     * @returns The ID of the employee.
     */
    get id(): number {
        return this._id;
    }

    /**
     * Gets the name of the employee.
     * @returns The name of the employee.
     */
    get name(): string {
        return this._name;
    }

    /**
     * Gets the email of the employee.
     * @returns The email of the employee.
     */
    get email(): string {
        return this._email;
    }

    /**
     * Gets the phone number of the employee.
     * @returns The phone number of the employee.
     */
    get phone(): string {
        return this._phone;
    }
}

export default Employee