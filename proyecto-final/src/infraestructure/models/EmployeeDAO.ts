'use client'

import IndexedDBManager from "../datasources/db/IndexedDBManager";

/**
 * Clase que representa el objeto de acceso a datos (DAO) para empleados.
 * Maneja todas las operaciones CRUD en la base de datos IndexedDB.
 */
class EmployeeDAO {
    /** ID único del empleado */
    private _id?: number;
    /** Nombre del empleado */
    private _name: string;
    /** Correo electrónico del empleado */
    private _email: string;
    /** Número de teléfono del empleado */
    private _phone: string;

    /** Instancia del administrador de IndexedDB para el almacenamiento de empleados */
    private static db = new IndexedDBManager<{id?: number, _name: string, _email: string, _phone: string }>('EmployeeDB', 'employees');

    /**
     * Crea una nueva instancia de EmployeeDAO.
     * @param name - Nombre del empleado
     * @param email - Correo electrónico del empleado
     * @param phone - Número de teléfono del empleado
     * @param id - ID opcional del empleado
     */
    constructor(name: string, email: string, phone: string, id?: number) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._phone = phone;
    }

    /**
     * Obtiene todos los empleados almacenados en la base de datos.
     * @returns Promesa que resuelve con un array de empleados
     */
    static async getAll(): Promise<EmployeeDAO[]> {
        const results = await this.db.getAll();
        return results.map(employee => new EmployeeDAO(employee._name, employee._email, employee._phone, employee.id))
    }

    /**
     * Obtiene un empleado específico por su ID.
     * @param id - ID del empleado a buscar
     * @returns Promesa que resuelve con el empleado encontrado
     */
    static async get(id: number): Promise<EmployeeDAO> {
        const result = await this.db.get(id);
        return new EmployeeDAO(result._name, result._email, result._phone, result.id)
    }

    /**
     * Agrega un nuevo empleado a la base de datos.
     * @returns Promesa que resuelve con el empleado agregado
     */
    async add(): Promise<EmployeeDAO> {
        const id = await EmployeeDAO.db.add({_name: this._name, _email: this._email, _phone: this._phone })
        this._id = id
        return this
    }

    /**
     * Actualiza los datos del empleado en la base de datos.
     * @throws Error si el empleado no tiene ID
     */
    async update(): Promise<void> {
        if (!this._id) {
            throw new Error('Employee not found')
        }
        await EmployeeDAO.db.update({id: this._id, _name: this._name, _email: this._email, _phone: this._phone })
    }

    /**
     * Elimina el empleado de la base de datos.
     * @throws Error si el empleado no tiene ID
     */
    async delete(): Promise<void> {
        if (!this._id) {
            throw new Error('Employee not found')
        }

        await EmployeeDAO.db.delete(this._id)
        return Promise.resolve()
    }

    /**
     * Obtiene el ID del empleado.
     * @returns ID del empleado o undefined si no está establecido
     */
    get id(): number | undefined {
        return this._id;
    }

    /**
     * Obtiene el nombre del empleado.
     * @returns Nombre del empleado
     */
    get name(): string {
        return this._name;
    }

    /**
     * Obtiene el correo electrónico del empleado.
     * @returns Correo electrónico del empleado
     */
    get email(): string {
        return this._email;
    }

    /**
     * Obtiene el número de teléfono del empleado.
     * @returns Número de teléfono del empleado
     */
    get phone(): string {
        return this._phone;
    }
}

export default EmployeeDAO