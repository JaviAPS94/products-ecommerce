const AumentProductMapper = module.exports;

const {
    AUMENT_PAYED_STATUS,
    AUMENT_PENDING_STATUS,
    AUMENT_DEFAULT_STATUS,
    WOOCOMERCE_PAYED_STATUS,
    SHOPIFY_PAYED_STATUS,
    SHOPIFY_PENDING_STATUS,
    WOOCOMERCE_PENDING_STATUS,
    WOOCOMERCE_OPEN_ORDER_STATUS,
    AUMENT_OPEN_ORDER_STATUS,
    SHOPIFY_OPEN_ORDER_STATUS,
    AUMENT_DEFAULT_ORDER_STATUS
} = require('../util/Constants');

AumentProductMapper.mapShopifyPayload = payload => ({
    id: payload.id,
    currency: payload.currency,
    created_at: payload.created_at,
    payment_status: this.mapPaymentStatus(payload.payment_status),
    status: this.mapOrderStatus(payload.status),
    subtotal: Number(payload.subtotal),
    discount: Number(payload.discount),
    cancel_reason: payload.cancel_reason,
    customer: {
        id: payload.customer.id,
        email: payload.customer.email,
        name: payload.customer.name
    }
});


AumentProductMapper.mapWoocommercePayload = payload => ({
    id: payload.id,
    currency: payload.currency,
    created_at: payload['created-at'],
    payment_status: this.mapPaymentStatus(payload['payment-stats']),
    status: this.mapOrderStatus(payload.stats),
    subtotal: Number(payload.subtotal),
    discount: Number(payload.discount),
    cancel_reason: payload['cancel-reason'],
    customer: {
        id: payload.customer.id,
        email: payload.customer.email,
        name: payload.customer.name
    }
});

AumentProductMapper.mapPaymentStatus = (paymentStatus) => {
    const status = {
        [WOOCOMERCE_PAYED_STATUS]: AUMENT_PAYED_STATUS,
        [SHOPIFY_PAYED_STATUS]: AUMENT_PAYED_STATUS,
        [SHOPIFY_PENDING_STATUS]: AUMENT_PENDING_STATUS,
        [WOOCOMERCE_PENDING_STATUS]: AUMENT_PENDING_STATUS,
        'default': AUMENT_DEFAULT_STATUS
    };

    return (status[paymentStatus] || status['default']);
}

AumentProductMapper.mapOrderStatus = (paymentStatus) => {
    const status = {
        [WOOCOMERCE_OPEN_ORDER_STATUS]: AUMENT_OPEN_ORDER_STATUS,
        [SHOPIFY_OPEN_ORDER_STATUS]: AUMENT_OPEN_ORDER_STATUS,
        'default': AUMENT_DEFAULT_ORDER_STATUS
    };

    return (status[paymentStatus] || status['default']);
}
