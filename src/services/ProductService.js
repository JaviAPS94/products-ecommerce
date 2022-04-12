const ProductService = module.exports;

const _ = require('lodash');
const { Shopify, Woocommerce } = require('../api/ecommercesData');
const productTransformStrategy = require('../strategies/ProductTransformStrategy');
const { SHOPIFY, WOOCOMMERCE, AUMENT_PAYED_STATUS, AUMENT_OPEN_ORDER_STATUS } = require('../util/Constants');

ProductService.getSummaryPurchasesByCustomer = async () => {
    const allOrdersGroupByEcommerce = await this.getAllOrdersGroupByEcommerce();

    const allEcommerceOrders = await this.getAllEcommerceOrders(allOrdersGroupByEcommerce);

    const ordersWithPaymentComplete = await this.filterEcommerceOrdersCompleted(allEcommerceOrders);

    const ordersGroupByCustomer = await this.getOrdersGroupByCustomer(ordersWithPaymentComplete);

    return await this.getSummaryResult(ordersGroupByCustomer);
};

ProductService.getAllOrdersGroupByEcommerce = async () => {
    return {
        shopify: Shopify.map(order => productTransformStrategy.execute.call(productTransformStrategy[SHOPIFY], 'map', order)),
        woocommerce: Woocommerce.map(order => productTransformStrategy.execute.call(productTransformStrategy[WOOCOMMERCE], 'map', order)),
    };
}

ProductService.getAllEcommerceOrders = async (allOrdersGroupByEcommerce) => {
    let allEcommerceOrders = [];

    Object.keys(allOrdersGroupByEcommerce).map(key => {
        allEcommerceOrders.push(...allOrdersGroupByEcommerce[key]);
    });

    return allEcommerceOrders;
}

ProductService.filterEcommerceOrdersCompleted = async (allEcommerceOrders) => {
    return allEcommerceOrders.filter(order => order.payment_status === AUMENT_PAYED_STATUS && order.status === AUMENT_OPEN_ORDER_STATUS && _.isNull(order.cancel_reason));
}

ProductService.getOrdersGroupByCustomer = async (ordersWithPaymentComplete) => {
    return _.groupBy(ordersWithPaymentComplete, (orderWithPaymentMade) => orderWithPaymentMade.customer.email);
}

ProductService.getSummaryResult = async (ordersGroupByCustomer) => {
    let total = 0;

    const mappedResults = Object.keys(ordersGroupByCustomer).map(key => {
        const orderValue = ordersGroupByCustomer[key];
        const ordersLength = orderValue.length;
        const ordersTotalByClient = orderValue.reduce((accumulator, order) => {
            return accumulator + (order.subtotal - order.discount)
        }, 0);
        const orderAverageByClient = ordersTotalByClient / ordersLength;

        total += ordersTotalByClient;

        return {
            email: key,
            name: orderValue[0].customer.name,
            avg_ticket: orderAverageByClient,
            quantity_orders: ordersLength
        };
    })

    return { total_billing: total, people: mappedResults };
}