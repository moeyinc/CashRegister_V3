import React, { useState, useEffect, useRef } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Product from "../components/Product";
import { CMS_URL, tabColors, API_KEY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

export default function ProductContainer(props) {
	const { products, categories } = props;
	const [key, setKey] = useState(0);
	const { locale } = useSelector((state) => state.cart);

        console.log(categories)
        console.log(products)
	return (
		<div className="product-container">
			<Tabs defaultActiveKey={key} onSelect={(k) => setKey(k)} fill>
				{categories && categories.map((category, index) => {
					if (category.attributes.products.data.length > 0) {
						return (
							<Tab
								tabClassName={`tabHead-${index}`}
								key={String(category.attributes.Name)}
								eventKey={index}
								title={
									locale == "en"
										? String(category.attributes.Name)
										: String(
												category.attributes.localizations.data[0].attributes
													.Name
										  )
								}
							>
								<div
									className="tab-container"
									style={{ background: tabColors[index].background }}
									
								>
									{products && products.map((product) => {
										if (
											category.attributes.Name ==
											product.attributes.category.data.attributes.Name
											&& product.attributes.Name
											&& product.attributes.Price
											&& product.attributes.Barcode 
											&& product.attributes.localizations.data[0]
										) {
											return (
												<Product
													key={product.id}
													id={product.id}
													name={product.attributes.Name}
													ESname={product.attributes.localizations.data[0].attributes.Name}
													image={ product.attributes.Image.data?.attributes === undefined ? undefined : 'thumbnail' in product.attributes.Image.data?.attributes ? `${CMS_URL}${product.attributes.Image.data?.attributes?.formats?.thumbnail?.url}` : `${CMS_URL}${product.attributes.Image.data?.attributes?.url}` }
													price={product.attributes.Price}
													barcode={product.attributes.Barcode}
												/>
											);
										}
									})}
								</div>
							</Tab>
						);
					}
				})}
			</Tabs>
		</div>
	);
}
