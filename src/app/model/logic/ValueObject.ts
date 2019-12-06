/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structural property.
 */

interface ValueObject<T> {

    equals(object: T): boolean;

}


