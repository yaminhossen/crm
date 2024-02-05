const express = require("express");
const user_routes = require("../app/api/user/user_designations/router/routes");
const user_demo_routes = require("../app/api/user_demo/router/routes");
const product_routes = require("../app/api/product/router/routes");
const customer_support_tickets  = require("../app/api/customers/customer_support_tickets/router/routes");
const customers  = require("../app/api/customers/customer/router/routes");
const calender_events  = require("../app/api/customers/calender_events/router/routes");
const customer_contact_numbers  = require("../app/api/customers/customer_contact_numbers/router/routes");
const customer_group_customers  = require("../app/api/customers/customer_group_customers/router/routes");
const  customer_relevent_documents  = require("../app/api/customers/customer_relevent_documents/router/routes");
const  customer_variant_customer  = require("../app/api/customers/customer_variant_customers/router/routes");
const  customer_variant_values  = require("../app/api/customers/customer_variant_values/router/routes");
const  customer_variants  = require("../app/api/customers/customer_variants/router/routes");
const  customer_groups  = require("../app/api/customers/customer_groups/router/routes");
const  contact_appointment_reasons  = require("../app/api/contacts/contact_appointment_reason/router/routes");
const  contact_appointments  = require("../app/api/contacts/contact_appointments/router/routes");
const  contact_histories  = require("../app/api/contacts/contact_histories/router/routes");
const  contact_history_feedbacks  = require("../app/api/contacts/contact_history_feedback/router/routes");
const  contact_history_reasons  = require("../app/api/contacts/contact_history_reason/router/routes");
const  contact_reasons  = require("../app/api/contacts/contact_reasons/router/routes");
const  crm_contact_numbers  = require("../app/api/contacts/crm_contact_numbers/router/routes");

const  leads  = require("../app/api/contacts/leads/router/routes");
const  user_infos  = require("../app/api/user/user_infos/router/routes");
const  user_work_departments  = require("../app/api/user/user_work_departments/router/routes");
const  user_work_users  = require("../app/api/user/user_work_users/router/routes");
const  user_works  = require("../app/api/user/user_works/router/routes");
const  users  = require("../app/api/user/users/router/routes");
const  task_user  = require("../app/api/tasks/task_users/router/routes");
const  tasks  = require("../app/api/tasks/tasks/router/routes");
const  task_variants  = require("../app/api/tasks/task_variants/router/routes");
const  task_variant_values  = require("../app/api/tasks/task_variant_values/router/routes");

const router = express.Router();

// user routes

router.use(user_routes());
router.use(user_infos());
router.use(user_work_departments());
router.use(user_work_users());
router.use(user_works());
router.use(users());

// demo user
router.use(user_demo_routes());

// product routes
router.use(product_routes());

// customer routes
router.use(customer_support_tickets());
router.use(customers());
router.use(calender_events());
router.use(customer_contact_numbers());
router.use(customer_group_customers());
router.use(customer_relevent_documents());
router.use(customer_variant_customer());
router.use(customer_variant_values());
router.use(customer_variants());
router.use(customer_groups());

// contact routes
router.use(contact_appointment_reasons());
router.use(contact_appointments());
router.use(contact_histories());
router.use(contact_history_feedbacks());
router.use(contact_history_reasons());
router.use(contact_reasons());
router.use(crm_contact_numbers());
router.use(leads());

// task routes
router.use(task_user());
router.use(tasks());
router.use(task_variants());
router.use(task_variant_values());




module.exports = () => router;