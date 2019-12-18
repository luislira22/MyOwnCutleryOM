import Order from '../../../src/model/orders2/Order';
import Quantity from "../../../src/model/orders2/OrderQuantity";
import Client from "../../../src/model/clients2/Client";
import Status from "../../../src/model/orders2/Status";
import OrderDate from "../../../src/model/orders2/OrderDate";
import Fullname from "../../../src/model/clients2/IFullname";
import Address from "../../../src/model/clients2/IAddress";
import Email from "../../../src/model/clients2/Email";
import NIF from "../../../src/model/clients2/Nif";
import Role from "../../../src/model/clients2/Role";

describe('Create a valid order', () => {

    let client = new Client(
        new Fullname("John", "Doe"),
        new Address("Rua 1", "4470-123", "Porto", "Portugal"),
        new Email("johndoe@gmail.com"),
        "123456789",
        new NIF(111111111),
        new Role("Admin"));
    let product = "asdf-sadf-asdf-sadf-1234-1234-1234";

    let quantity = new Quantity(20);
    let status = new Status("ACCEPTED");
    let orderDate = new OrderDate("2019-10-10");
    let order = new Order(client, product, quantity, status, orderDate);

    it("ensure all Parameters are well formed",()=>{
        expect(order.client).toEqual(client);
    })
    it("ensure all Parameters are well formed",()=>{
        expect(order.quantity).toEqual(quantity);
    })
    it("ensure all Parameters are well formed",()=>{
        expect(order.productID).toEqual(product);
    })
    it("ensure all Parameters are well formed",()=>{
        expect(order.date).toEqual(orderDate);
    })
    it("ensure all Parameters are well formed",()=>{
        expect(order.status).toEqual(status);
    })
    it("ensure is an Entity",()=>{
        expect(order.isEntity());
    })
});
