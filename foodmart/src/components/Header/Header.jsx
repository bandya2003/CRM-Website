import React from 'react'
import Nav from 'react-bootstrap/Nav';
import "./Header.css"

const Header = ({filterItem, menuList}) => {
	return (
		<>
			<Nav variant="tabs" defaultActiveKey="/All" className='header '>
				<Nav.Item>
					<Nav.Link eventKey="/All" onClick={() =>{
						filterItem("All")
					}}>
						All
					</Nav.Link>
				</Nav.Item>
				{
					menuList.map((item) =>{
						return (
							<Nav.Item>
								<Nav.Link eventKey={item} key={item} onClick={() =>{
									filterItem(item)
								}}>
									{item}
								</Nav.Link>
							</Nav.Item>
						)
					})
				}
			</Nav>
		</>
	)
}

export default Header