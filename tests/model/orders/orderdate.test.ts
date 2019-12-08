import OrderDate from '../../../src/app/model/orders2/OrderDate';

test('Create a valid order date', () => {

    let orderDate = new OrderDate("2019-10-10");
    expect(orderDate.date.toDateString()).toBe("Thu Oct 10 2019");
});


describe('Create an invalid order date', () => {
    it('invalid month', () => {
        try {
            let orderDate = new OrderDate("2019-16-10");
        } catch (e) {
            expect(e.message).toBe('Date format is incorrect');
        }
    });

    describe('Create an invalid order date', () => {
        it('invalid day', () => {
            try {
                let orderDate = new OrderDate("2019-16-10");
            } catch (e) {
                expect(e.message).toBe('Date format is incorrect');
            }
        });
    });

});

