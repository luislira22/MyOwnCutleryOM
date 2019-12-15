export interface IBaseRepository<T> {
    create(item: T): Promise<T>;
    find(): Promise<T[]>;
    findOne(id: string): Promise<T>;
    update(id: string, item: T): Promise<boolean>;
    delete(id: string): Promise<boolean>;
}
