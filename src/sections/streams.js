import { h } from 'hyperapp';

export default {
    view(state, actions) {
        const handleFieldChange = event => {
            actions.changeFormField({
                name: event.target.getAttribute('name'),
                value: event.target.value,
            });
        };
        const handleSubmit = event => {
            event.preventDefault();
            actions.submitForm();
        };
        return (
            <div>
                <form onsubmit={handleSubmit}>
                    <p>
                        <label>First Name:</label>
                        <input
                            type={'text'}
                            name={'firstname'}
                            value={state.form.firstname}
                            onchange={handleFieldChange}
                        />
                    </p>
                    <p>
                        <button type="submit">Send it!</button>
                    </p>
                </form>
            </div>
        );
    }
};
