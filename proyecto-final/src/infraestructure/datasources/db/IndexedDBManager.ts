'use client'
/**
* Ejecuta el caso de uso para encontrar un empleado.
* @returns Una promesa que se resuelve con el empleado encontrado.
*/
class IndexedDBManager<T> {
    private dbName: string;
    private storeName: string;
    private version: number;

    /**
    * Crea una instancia de IndexedDBManager.
    * @param dbName - El nombre de la base de datos.
    * @param storeName - El nombre del almacén de objetos.
    * @param version - La versión de la base de datos.
    */
    constructor(dbName: string, storeName: string, version: number = 1) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
    }

    /**
     * Abre la base de datos.
     * @returns Una promesa que se resuelve con la instancia de IDBDatabase.
     */
    private openDB(): Promise<IDBDatabase> {
        if(!window.indexedDB) {
            throw new Error('IndexedDB no esta disponible, intente acceder desde otro navegador.');
        }
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: '_id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    /**
     * Obtiene todos los registros del almacén de objetos.
     * @returns Una promesa que se resuelve con una lista de registros.
     */
    async getAll(): Promise<T[]> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Obtiene un registro por su ID.
     * @param id - El ID del registro.
     * @returns Una promesa que se resuelve con el registro.
     */
    async get(id: number): Promise<T> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Agrega un nuevo registro al almacén de objetos.
     * @param data - Los datos del registro a agregar.
     * @returns Una promesa que se resuelve con el ID del nuevo registro.
     */
    async add(data: T): Promise<number> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add({ ...data });

            request.onsuccess = () => {
                resolve(request.result as number);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Actualiza un registro existente en el almacén de objetos.
     * @param data - Los datos del registro a actualizar.
     * @returns Una promesa que se resuelve cuando la actualización se completa.
     */
    async update(data: T): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({ ...data });

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }

    /**
     * Elimina un registro del almacén de objetos por su ID.
     * @param id - El ID del registro a eliminar.
     * @returns Una promesa que se resuelve cuando la eliminación se completa.
     */
    async delete(id: number): Promise<void> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }
}

export default IndexedDBManager;