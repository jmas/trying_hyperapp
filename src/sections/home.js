import { h } from 'hyperapp';

export default {
    view(state, actions) {
        console.log('actions', actions);
        return (
            <div>
                Home with some content.
                <button onclick={() => actions.addSection()}>Add section</button>
            </div>
        );
    }
};
