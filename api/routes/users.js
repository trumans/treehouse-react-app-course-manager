const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

const { authenticateUser, findUserByEmail } = require("../support/utils");

const User = require("../models").User; 

router.get('/', authenticateUser, (req, res) => {
	User
		.findOne( {
			where: { id: req.currentUser.id },
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
		})
		.then((user) => {
			res.json( { user } );
		});
});

router.post('/',
	[ check('firstName')
		.exists( { checkNull: true, checkFalsy: true } )
		.withMessage('Please enter your first name.'),

	  check('lastName')
	  	.exists( { checkNull: true, checkFalsy: true } )
		.withMessage('Please enter your last name.'),

	  check('emailAddress')
	  	.exists( { checkNull: true, checkFalsy: true } )
		.withMessage('Please enter an email address.')
	  	.isEmail()
		.withMessage("Please use a valid email format for your email address."),

	  check('password')
	  	.exists( { checkNull: true, checkFalsy: true } )
		.withMessage('Please enter a password.'),

	  check('confirmPassword')
		.exists( { checkNull: true, checkFalsy: true } )
		.withMessage('Please enter your password again in "Confirm Password".')
	],
	(req, res) => {
		const errorMsgs = validationResult(req).array().map(e => e.msg);
		const newUser = req.body;

		findUserByEmail(newUser.emailAddress)
			.then((existingUser) => {
				if (existingUser) { 
					errorMsgs.push("Please enter a different email address. The one provided is used by another user.");
				}

				if (newUser.password != newUser.confirmPassword) {
					errorMsgs.push("Password and confirmation did not match. Please re-enter.");
				}
		
				if (!errorMsgs.length) {
					User
						.create({
							firstName: newUser.firstName,
							lastName:  newUser.lastName,
							emailAddress: newUser.emailAddress,
							password:  bcryptjs.hashSync(newUser.password)
						})
						.then(() => {
							res.location('/').status(201).end();
						});
				} else {
					res.status(400).json({ errors: errorMsgs });
				}
			})
});

module.exports = router;