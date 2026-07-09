// interface ObjectStore {
//   id: string // UUID v7 or any UUID in string format
//   [key: string]: any // Additional properties with string keys and any type values
// }
type ID = string
interface DB {
  id: ID
}
export class IndexedDB<ObjectStore extends DB> {
  private db: IDBDatabase | null = null
  private dbName: string
  private tableName: string
  private dbVersion: number = 1

  constructor(dbName: string, tableName: string) {
    this.dbName = dbName
    this.tableName = tableName
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db)
        return
      }

      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = (event) => {
        console.error('Database error:', (event.target as IDBRequest).error)
        reject((event.target as IDBRequest).error)
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBRequest).result
        if (this.db) {
          console.log(`Database '${this.dbName}' opened successfully`)
          resolve(this.db)
        } else {
          reject(new Error('Failed to open database.'))
        }
      }

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBRequest).result

        if (this.db && !this.db.objectStoreNames.contains(this.tableName)) {
          const objectStore = this.db.createObjectStore(this.tableName, {
            keyPath: 'id',
            autoIncrement: true,
          })
          console.log('Object store created', objectStore)
        }
      }
    })
  }

  public async addObj(obj: ObjectStore): Promise<number> {
    try {
      const db = await this.ensureDb() // Ensure DB is opened and non-null

      const transaction = db.transaction([this.tableName], 'readwrite')
      const objectStore = transaction.objectStore(this.tableName)
      const request = objectStore.add(obj)

      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          resolve((event.target as IDBRequest).result as number)
        }

        request.onerror = (event) => {
          console.error('Error storing grid:', (event.target as IDBRequest).error)
          reject((event.target as IDBRequest).error)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async getObj(id: ID): Promise<ObjectStore> {
    try {
      const db = await this.ensureDb() // Ensure DB is opened and non-null

      const transaction = db.transaction([this.tableName])
      const objectStore = transaction.objectStore(this.tableName)
      const request = objectStore.get(id)

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request?.result)
        }

        request.onerror = (event) => {
          console.error('Error retrieving grid:', (event.target as IDBRequest).error)
          reject((event.target as IDBRequest).error)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async updateObj(data: ObjectStore): Promise<boolean> {
    try {
      const db = await this.ensureDb() // Ensure DB is opened and non-null

      const transaction = db.transaction([this.tableName], 'readwrite')
      const objectStore = transaction.objectStore(this.tableName)

      const existingRecordRequest = objectStore.get(data.id)

      return new Promise((resolve, reject) => {
        existingRecordRequest.onsuccess = () => {
          if (existingRecordRequest.result) {
            const updateRequest = objectStore.put(data)

            updateRequest.onsuccess = () => {
              resolve(true)
            }

            updateRequest.onerror = (event) => {
              console.error('Error updating grid:', (event.target as IDBRequest).error)
              reject((event.target as IDBRequest).error)
            }
          } else {
            console.log('id not found, cannot update')
            resolve(false)
          }
        }

        existingRecordRequest.onerror = (event) => {
          console.error('Error fetching grid for update:', (event.target as IDBRequest).error)
          reject((event.target as IDBRequest).error)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  private async ensureDb(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db
    } else {
      return await this.openDatabase()
    }
  }
}
