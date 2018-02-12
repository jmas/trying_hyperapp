import { h, app } from 'hyperapp';
import logger from '@hyperapp/logger';
import List from './components/list';
import Message from './components/message';
import MessageForm from './components/message_form';
import SectionLoader from './components/section_loader';
import SocketIo from 'socket.io-client';

const socket = SocketIo();

function view(state, actions) {
    const { messages, editingMessage } = state;
    const handleCreate = () => {
        socket.on('messages', ({ messages }) => {
            actions.addMessages({
                messages,
            });
        });
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
        socket.emit('message', { message: state.editingMessage });
        return {
            ...state,
            editingMessage: {
                text: '',
            },
        };
    },
};

logger({})(app)(defaultState, actions, view, document.getElementById('app'));
