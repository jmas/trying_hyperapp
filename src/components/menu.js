import { h } from 'hyperapp';
import MenuItem from './menu_item';

export default function Menu({
    items=[],
    ItemComponent=MenuItem,
    handleClick,
}) {
    return (
        <ul>
            { items.map((item, index) => (
                <li>
                    <ItemComponent
                        {...item}
                        key={index}
                        handleClick={() => handleClick(item)}
                    />
                </li>
            )) }
        </ul>
    );
}
