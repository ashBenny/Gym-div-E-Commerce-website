const express = require('express');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const { createNewOrder, getSingleOrder, myOrders,
    allOrders, updateOrder, deleteOrder  } = require('../controllers/orderController');


router.route('/order/new').post(isAuthenticatedUser, createNewOrder);

// router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
// router.route('/orders/myOrders').get(isAuthenticatedUser, myOrders);

// router.route('/admin/allOrders').get(isAuthenticatedUser, authorizeRoles('admin') , allOrders);
// router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin') , updateOrder);
// router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin') , deleteOrder);



module.exports = router;