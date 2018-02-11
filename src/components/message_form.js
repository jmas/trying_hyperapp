import { h } from 'hyperapp';

export default function MessageForm({
    message={},
    handleFieldChange,
    handleSubmit,
}) {
    const handleFormFieldChange = event => {
        const target = event.target;
        handleFieldChange(target.name, target.value);
    };
    const handleFormSubmit = event => {
        event.preventDefault();
        handleSubmit();
    };
    return (
        <form onsubmit={handleFormSubmit}>
            <input
                type={'text'}
                name={'text'}
                value={message.text}
                onchange={handleFormFieldChange}
            />
            <button>Send</button>
        </form>
    );
}
