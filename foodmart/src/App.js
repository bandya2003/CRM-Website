import { React, useState } from 'react'
import "./style.css"
import Menu from '../src/components/Api/MenuApi'
import ItemCard from '../src/components/ItemCard/ItemCard'
import Header from './components/Header/Header';
import { Card } from 'react-bootstrap'

const uniqueList = [
	...new Set(
		Menu.map((currEl) => {
			return currEl.category;
		})
	)
];

const App = () => {

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
			<Header filterItem = {filterItem} menuList = {menuList}/>
			
			<Card className='main-card flex-row'>
				{
					menuData.map((curr) =>{
						return <ItemCard item = {curr} />
					})
				}
			</Card>

		</>
	)
}

export default App;
