import { h } from 'hyperapp';

export default function List({
    items=[],
    ItemComponent,
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
