import Client from "../../../src/model/user/client/Client";
import Fullname from "../../../src/model/user/client/Fullname";
import Address from "../../../src/model/user/client/Address";
import Email from "../../../src/model/user/Email";
import OrderStatus from "../../../src/model/orders/OrderStatus";
import OrderDate from "../../../src/model/orders/OrderDate";
import Order from "../../../src/model/orders/Order";
import OrderQuantity from "../../../src/model/orders/OrderQuantity";
import Nif from "../../../src/model/user/client/Nif";
import Priority from "../../../src/model/user/client/Priority";
import OrderRequestedDeliveryDate from "../../../src/model/orders/OrderRequestedDeliveryDate";

describe('Create a valid order', () => {

    let client = new Client(
        new Email("johndoe@gmail.com"),
        "123456789",
        new Fullname("John", "Doe"),
        new Address("Rua 1", "4470-123", "Porto", "Portugal"),
        new Nif(111111111),
        new Priority(1));
    let product = "asdf-sadf-asdf-sadf-1234-1234-1234";

    let quantity = new OrderQuantity(20);
    let status = new OrderStatus("ACCEPTED");
    let orderDate = new OrderDate("2019-10-10");
    let orderRequestedDeliveryDate = new OrderRequestedDeliveryDate("2029-10-10");
    let order = new Order(client, product, quantity, status, orderDate, orderRequestedDeliveryDate);

    it("ensure all Parameters are well formed", () => {
        expect(order.client).toEqual(client);
    });
    it("ensure all Parameters are well formed", () => {
        expect(order.quantity).toEqual(quantity);
    });
    it("ensure all Parameters are well formed", () => {
        expect(order.productID).toEqual(product);
    });
    it("ensure all Parameters are well formed", () => {
        expect(order.date).toEqual(orderDate);
    });
    it("ensure all Parameters are well formed", () => {
        expect(order.status).toEqual(status);
    });
});
