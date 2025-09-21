import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart, setLocale } from "../redux/slices/cart";
import { useSelector, useDispatch } from "react-redux";
import { CMS_URL, API_KEY } from "../utils/constants";

export default function Product(props) {
	const { id, name, image, price, barcode, category, ESname } = props;
	const { locale } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const [Img, setImg] = useState();
	const [added, setAdded] = useState(false);

	let code = "";
	let count = 0;

	document.addEventListener("keydown", (e) => {
		if (e.key == "Enter") {
			e.preventDefault();
			if (code.length >= 11) {
				//	console.log(code)
				if (code == barcode) {
					setAdded(true);
				}
			}
		}

		if (e.key != "Shift" && e.key != "Enter") {
			code += e.key;
		}
	});

	const add = () => {
		const item = { ...props };
		dispatch(addToCart(item));
	};

	useEffect(() => {
		let interval;
		if (added) {
			count += 1;

			console.log(count);
			interval = setInterval(() => {
				setAdded(false);
				count = 0;
				code = "";
			}, 100);
		}

		if (count == 0) add();
	}, [added, count]);

	const fetchImage = async (url) => {
		return await new Promise((resolve, reject) => {
			fetch(`${url}`, {
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.blob()) // sending the blob response to the next then
				.then((blob) => {
					const objectUrl = window.URL.createObjectURL(blob);
					const reader = new FileReader();
					reader.readAsDataURL(blob);

					reader.onloadend = () => {
						setImg(reader.result);
						localStorage.removeItem(`img-${id}`);
						localStorage.setItem(`img-${id}`, reader.result);
						// console.log(reader.result);
						return reader.result;
					};
				})
				.catch((err) => {
					// reject(err);
				});
		});
	};

	useEffect(() => {
		if (id && image) {
			fetchImage(image);
		}
	}, [id, image]);

	return (
		<button className="product-card" onClick={() => add()}>
			<img
				src={Img ? Img : localStorage.getItem(`img-${id}`)}
				id={`product-img`}
			/>
			<p className="product-name">{locale == "en" ? name : ESname}</p>
		</button>
	);
}
