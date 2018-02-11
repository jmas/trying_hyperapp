import { h } from 'hyperapp';

export default function MenuItem({
    name,
    url,
    handleClick,
}) {
    return (
        <a href={url} onclick={() => handleClick()}>{name}</a>
    );
}
