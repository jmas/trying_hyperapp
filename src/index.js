import { h, app } from 'hyperapp';
import logger from '@hyperapp/logger';
import List from './components/list';
import Message from './components/message';
import MessageForm from './components/message_form';
import SectionLoader from './components/section_loader';

function view(state, actions) {
    const { messages, editingMessage } = state;
    return (
        <div>
            <List
                items={messages}
                ItemComponent={Message}
            />
            <MessageForm
                message={editingMessage}
                handleFieldChange={(name, value) => actions.changeEditingMessage({ [name]: value })}
                handleSubmit={() => actions.addEditingMessage()}
            />
        </div>
    );
}

const defaultState = {
    messages: [
        {
            text: 'Hello.',
        }
    ],
    editingMessage: {
        text: '',
    },
};

const actions = {
    changeEditingMessage: message => state => {
        return {
            ...state,
            editingMessage: {
                ...state.message,   
                ...message, 
            },
        };
    },

    addEditingMessage: () => state => {
        return {
            ...state,
            messages: [
                ...state.messages,
                state.editingMessage,
            ],
            editingMessage: {
                text: '',
            },
        };
    },
};

logger({})(app)(defaultState, actions, view, document.body);
