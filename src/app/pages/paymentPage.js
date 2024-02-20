import React, { useEffect, useState } from "react";
import PayBG from "../../assets/paymodule/pay_logo.png";
import PayHeader from "../../assets/paymodule/payment-header.png";
import PayFooter from "../../assets/paymodule/payment-footer.png";
import PayImage from "../../assets/paymodule/paidStamp.png";
import One from "../../assets/paymodule/one.png";
import Five from "../../assets/paymodule/five.png";
import Dime from "../../assets/paymodule/dime.png";
import Nickel from "../../assets/paymodule/nickel.png";
import Penny from "../../assets/paymodule/penny.png";
import Ten from "../../assets/paymodule/ten.png";
import Twenty from "../../assets/paymodule/twenty.png";
import Quarter from "../../assets/paymodule/quarter.png";
import { useDispatch, useSelector } from "react-redux";
import {
	addPaymentItem,
	showPayment,
	donePayment,
} from "../redux/slices/payment";

export default function PaymentPage(props) {
	const { cartItems, quantity, totalAmount, checkout } = useSelector(
		(state) => state.cart
	);
	const { show, paid, completed } = useSelector((state) => state.payment);
	const [remainder, setRemainder] = useState(0);
	const [change, setChange] = useState(0);
	const [done, setDone] = useState(false);

	const dispatch = useDispatch();

	const bills = [
		{ value: 1, image: One },
		{ value: 5, image: Five },
		{ value: 10, image: Ten },
		{ value: 20, image: Twenty },
	];

	const coins = [
		{ value: 0.01, image: Penny },
		{ value: 0.05, image: Nickel },
		{ value: 0.1, image: Dime },
		{ value: 0.25, image: Quarter },
	];

	const handlePay = (value) => {
		dispatch(addPaymentItem(value));
	};

	useEffect(() => {
		let temp = totalAmount - paid;
		if (temp >= 0) {
			setRemainder((remainder) => temp);
		} else {
			setRemainder(0);
		}

		if (paid != 0 && totalAmount != 0 && paid >= totalAmount) {
			dispatch(donePayment());
		}

		if (completed) {
			let t = paid - totalAmount;
			setChange(t);
		}
	}, [paid, totalAmount, completed, change]);

	return (
		<div className="payment-wrapper">
			<div className="payment-bg">
				<img src={PayBG} id="paybg-img" />
			</div>
			<div
				className="pay-content"
				style={{ display: checkout ? "flex" : "none" }}
			>
				<div className="pay-left">
					<img src={PayHeader} id="payheader-img" />
					<div className="pay-amount">
						<div className="pay-amount-left">
							<p id="pay-amount-total">Total: </p>
							<p id="pay-amount-paid">Amount Paid: </p>
							<p id="pay-amount-to-go">Amount to go: </p>
	
						</div>
						<div className="pay-amount-right">
							<p id="pay-amount-total">{`$${parseFloat(totalAmount).toFixed(
								2
							)}`}</p>
							<p id="pay-amount-paid">{`$${parseFloat(paid).toFixed(2)}`}</p>
							<p id="pay-amount-to-go">{`$${parseFloat(remainder).toFixed(
								2
							)}`}</p>
						</div>
					</div>

					<div
						className="payment-footer"
						style={{ opacity: !completed ? 1 : 0 }}
					>
						<img src={PayFooter} id="payfooter-img" />
					</div>
					<div
						className="payment-footer-text"
						style={{ opacity: !completed ? 1 : 0 }}
					>
						<h6> TOUCH BILLS AND COINS TO PAY </h6>
					</div>

					<div
						className="paid-img"
						style={{ display: completed ? "block" : "none" }}
					>
						<img src={PayImage} id="paid-image" />
					</div>
					<div
						className="paid-change-container"
						style={{ display: completed ? "block" : "none" }}
					></div>
					<p id="paid-change-text" style={{ display: completed ? "block" : "none" }}>Change:</p>
					<p id="paid-change-amount" style={{ display: completed ? "block" : "none" }}>{`$${parseFloat(change).toFixed(2)}`}</p>
				</div>
				<div className="pay-right">
					<div className="pay-cash">
						{bills.map((bill) => {
							return (
								<img
									key={bill.value}
									src={bill.image}
									onClick={() => handlePay(bill)}
								/>
							);
						})}
					</div>
					<div className="pay-coins">
						{coins.map((coin) => {
							return (
								<img
									key={coin.value}
									src={coin.image}
									onClick={() => handlePay(coin)}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}