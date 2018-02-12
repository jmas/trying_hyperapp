import { h } from 'hyperapp';

export default function List({
    items=[],
    ItemComponent,
    handleClick,
}) {
    return (
        <ul>
            { items.map((item, index) => (
                <li key={index}>
                    <ItemComponent
                        {...item}
                        handleClick={() => handleClick(item)}
                    />
                </li>
            )) }
        </ul>
    );
}
