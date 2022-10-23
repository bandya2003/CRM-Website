import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Menu from "../Api/MenuApi"
import "./ItemCard.css"

const ItemCard = ({item}) => {
  return (
    <>
        <Card className='item-card'>
            <div className='card-top'>
                <div className="left border-btm">
                    {item.id}
                </div>
                <div className="right border-btm">
                    {item.category}
                </div>
            </div>

            <img src={item.image} alt="Dish image..." />
            <Card.Body>
                <div className="mid">
                    <div className="name border-btm">{item.name}</div>
                    <div className="price border-btm">@{item.price} Only</div>
                </div>
                <Card.Text>
                    <div className="description">
                        {item.description}
                        {/* description:"The best Maggie in market... Have the awesome taste in your breakfast." */}
                    </div>
                </Card.Text>
                <Button variant="primary">Order</Button>
            </Card.Body>
        </Card>
    </>
  )
}

export default ItemCard