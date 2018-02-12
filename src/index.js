import { h, app } from 'hyperapp';
import logger from '@hyperapp/logger';
import List from './components/list';
import Message from './components/message';
import MessageForm from './components/message_form';
import SectionLoader from './components/section_loader';

function initTimer({
    delay=10000,
    fn,
}) {
    let timer = null;
    return {
        start() {
            const tick = () => {
                fn();
                timer = setTimeout(tick, delay);
            };
            tick();
        },

        stop() {
            clearTimeout(timer);
        },
    };
}

const socket = new WebSocket('ws://localhost:3001/');

function view(state, actions) {
    const { messages, editingMessage } = state;
    const handleCreate = () => {
        socket.onmessage = (event) => {
            actions.addMessages({
                messages: JSON.parse(event.data),
            });
        };
    };
    return (
        <div oncreate={handleCreate}>
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
    updateMessages: ({ messages }) => state => {
        return {
            ...state,
            messages,
        };
    },

    addMessages: ({ messages }) => state => {
        return {
            ...state,
            messages: [
                ...state.messages,
                ...messages,
            ],
        };
    },

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
        socket.send(JSON.stringify(state.editingMessage));
        return {
            ...state,
            editingMessage: {
                text: '',
            },
        };
    },
};

logger({})(app)(defaultState, actions, view, document.getElementById('app'));
