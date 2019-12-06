interface AggregateRoot<T> extends Entity<T> {

    equals(object: T): boolean;
    isEntity(): boolean;
}
