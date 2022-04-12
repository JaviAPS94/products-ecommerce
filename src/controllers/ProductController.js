const ProductController = module.exports;

const ProductService = require('../services/ProductService');

ProductController.getSummaryPurchasesByCustomer = async (req, res, next) => {
    try {
        const summary = await ProductService.getSummaryPurchasesByCustomer();
        return res.send(summary);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};