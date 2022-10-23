import { React, useState } from 'react'
import { Card } from 'react-bootstrap'
import Menu from '../Api/MenuApi'
import ItemCard from '../ItemCard/ItemCard'
import "./Maincard.css"

const uniqueList = [
	...new Set(
		Menu.map((currEl) => {
			return currEl.category;
		})
	),
	"All"
]

const MainCard = () => {

	const [menuData, setMenuData] = useState(Menu);
	const [menuList, setMenuList] = useState(uniqueList);
	console.log(menuData);
	console.log(menuList);

	const filterItem = (category) =>{
		if(category === "All"){
			setMenuData(Menu);
			return ;
		}

		const updatedList = Menu.filter((currEl) =>{
			return currEl.category === category;
		});

		setMenuData(updatedList);
	}

	return (
		<>
			<Card className="main-card flex-row">
				<ItemCard />
				<ItemCard />
				<ItemCard />
				<ItemCard />
				<ItemCard />
				<ItemCard />
				<ItemCard />
			</Card>
		</>
	)
}

export default MainCard