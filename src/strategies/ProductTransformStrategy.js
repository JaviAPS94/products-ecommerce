const ProductTransformStrategy = module.exports;

const mapper = require('../mappers/AumentProductMapper');

ProductTransformStrategy.shopify = {
    map: mapper.mapShopifyPayload
};

ProductTransformStrategy.woocommerce = {
    map: mapper.mapWoocommercePayload
};

ProductTransformStrategy.execute = function executeStrategy(strategy, payload, options = {}) {
    return this[strategy] ? this[strategy](payload, options) : null;
};