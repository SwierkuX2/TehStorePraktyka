import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"


type StoreItemProps = {
    id: number
    name: string
    price: number
    img: string
}

export function StoreItem({ id, name, price, img }: StoreItemProps) {
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    return (
        <Card style={{ background: "#181B20"}} className="h-100">
            <Card.Img 
                variant="top" 
                src={img} 
                height="200px" 
                style={{ objectFit: "contain" }} 
            />
            <Card.Body style={{ background: "#181B20"}} className=" d-flex flex-column">
                <Card.Title className=" d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-9">{name}</span>
                    <span className="ms-4 f text-muted">{price+ "Zł"}</span>
                </Card.Title>
                <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={() => increaseItemQuantity(id)}>Dodaj Do Koszyka</Button>
                ): <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}>
                    <Button onClick={() => decreaseItemQuantity(id)} style={{ background:"#252A33"}}>-</Button> 
                    <div>
                    <span className="fs-10">{quantity} W Koszyku</span>
                    </div>
                    <Button onClick={() => increaseItemQuantity(id)} style={{ background:"#252A33"}}>+</Button>
                    </div>
                    <Button onClick={() => removeFromCart(id)} style={{ background:"#ac0505a8",}} size="sm">Usuń</Button>
                    </div>}

                </div>
            </Card.Body>
        </Card>
    )
}