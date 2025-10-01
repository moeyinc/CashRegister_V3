import React, { useEffect, useState } from "react";
import ProductContainer from "./productContainer";
import ReceiptContainer from "./receiptContainer";
import CartContainer from "./cartContainer";
import bgTop from "../../assets/bg_top.png";
import { CMS_URL, API_KEY, LOCALE_EN, LOCALE_ES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import cart, { setLocale } from "../redux/slices/cart";
import { useQuery, onlineManager, useQueryClient } from "@tanstack/react-query";
import axios, { all } from "axios";


export default function MainPage(props) {
	const { queryClient } = props;

	const [lang, setLang] = useState(LOCALE_EN);
	const [buttonText, setButtonText] = useState("Español");
	const { locale } = useSelector((state) => state.cart);

	const dispatch = useDispatch();

	const ChangeLanguage = () => {
		if (lang == LOCALE_EN) setLang(LOCALE_ES);
		if (lang == LOCALE_ES) setLang(LOCALE_EN);
	};

	useEffect(() => {
		if (lang == LOCALE_EN) setButtonText("Español");
		if (lang == LOCALE_ES) setButtonText("English");
		dispatch(setLocale(lang));
	}, [lang, buttonText]);


	// fetching data through react-query and storing in local storage
	const fetchProducts = async ({signal}) => {
		const response = await axios.get(`${CMS_URL}/api/products?&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
			signal
		});

		if (response) {
			localStorage.removeItem("products");
			localStorage.setItem("products", JSON.stringify(response.data.data));
			return response.data.data;
		} 
	};

	const fetchCategories = async ({signal}) => {
		const response = await axios.get(`${CMS_URL}/api/categories?&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
			signal
		});

		if (response) {
			localStorage.removeItem("categories");
			localStorage.setItem("categories", JSON.stringify(response.data.data));
			return response.data.data;
		}
	};

	const fetchCartText = async ({signal}) => {
		const response = await axios.get(`${CMS_URL}/api/cart-texts?&populate=*`, {
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				"Content-Type": "application/json",
			},
			signal
		});

		if (response) {
			localStorage.removeItem("cartText");
			localStorage.setItem("cartText", JSON.stringify(response.data.data));
			return response.data.data;
		} 
	};

	const fetchReceiptText = async ({signal}) => {
		const response = await axios.get(
			`${CMS_URL}/api/receipt-texts?&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					"Content-Type": "application/json",
				},
				signal
			},
			
		);

		if (response) {
			localStorage.removeItem("receiptText");
			localStorage.setItem("receiptText", JSON.stringify(response.data.data));
			return response.data.data;
		} 
	};

	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: ({signal}) => fetchProducts({signal}),
		initialData: () => {
			const cachedData = queryClient.getQueryData("products");
			if (cachedData) {
				return cachedData;
			}
		},
		refetchOnReconnect: "always",
		refetchInterval: 1000 * 60 * 60 * 24, // refetch every 24 hours
	});

	const { data: receiptText } = useQuery({
		queryKey: ["receiptText"],
		queryFn: ({signal}) => fetchReceiptText({signal}),
		initialData: () => {
			const cachedData = queryClient.getQueryData("receiptText");
			if (cachedData) {
				return cachedData;
			}
		},
		refetchOnReconnect: "always",
		refetchInterval: 1000 * 60 * 60 * 24, // refetch every 24 hours
	});

	const { data: cartText } = useQuery({
		queryKey: ["cartText"],
		queryFn: ({signal}) => fetchCartText({signal}),
		initialData: () => {
			const cachedData = queryClient.getQueryData("cartText");
			if (cachedData) {
				return cachedData;
			}
		},
		refetchOnReconnect: "always",
		refetchInterval: 1000 * 60 * 60 * 24, // refetch every 24 hours
	});

	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: ({signal}) => fetchCategories({signal}),
		initialData: () => {
			const cachedData = queryClient.getQueryData("categories");
			if (cachedData) {
				return cachedData;
			}
		},
		refetchOnReconnect: "always",
		refetchInterval: 1000 * 60 * 60 * 24, // refetch every 24 hours
	});

	let code = ''




	return (
		<div className="main-wrapper">
			<div className="main">
				<div className="header">
					<img src={bgTop} alt="bg" id="bgTop" />
				</div>
				<div className="body">
					<ProductContainer
						locale={locale}
						products={products ? products : JSON.parse(localStorage.getItem("products"))}
						categories={categories ? categories : JSON.parse(localStorage.getItem("categories"))}
					/>
					<CartContainer cartText={cartText ? cartText : JSON.parse(localStorage.getItem("cartText"))} />
					<ReceiptContainer receiptText={receiptText ? receiptText : JSON.parse(localStorage.getItem("receiptText"))} />
				</div>
			</div>
		</div>
	);
}
