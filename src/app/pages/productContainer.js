import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Product from "../components/Product";
import { CMS_URL,tabColors } from "../utils/constants";

export default function ProductContainer(props) {
	const { products, categories } = props;
	const [key, setKey] = useState(0);

	return (
		<div className="product-container">
			<Tabs defaultActiveKey={key} onSelect={(k) => setKey(k)} fill>
				{categories?.map((category, index) => {
					if (category.attributes.products.data.length !== 0) {
						return (
							<Tab
								tabClassName={`tabHead-${index}`}
								key={String(category.attributes.Name)}
								eventKey={index}
								title={String(category.attributes.Name)}
							>
								<div className="tab-container"
								style={{background: tabColors[index].background}}>
									{products?.map((product) => {
										if (
											category.attributes.Name ==
											product.attributes.category.data.attributes.Name
										)
											return (
												<Product
													key={product.id}
													id={product.id}
													name={product.attributes.Name}
													image={`${CMS_URL}${product.attributes.Image.data.attributes.formats.thumbnail.url}`}
													price={product.attributes.Price}
													barcode={product.attributes.Barcode}
												/>
											);
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
