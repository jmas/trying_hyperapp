import { h, app } from 'hyperapp';
import logger from '@hyperapp/logger';
import Menu from './components/menu';
import SectionLoader from './components/section_loader';

const SECTION_HOME = 'home';
const SECTION_STREAMS = 'streams';

const SECTIONS_CONTENT = {
    [SECTION_HOME]:     () => import('./sections/home'),
    [SECTION_STREAMS]:  () => import('./sections/streams'),
};

function view(state, actions) {
    const { categories, section, } = state;
    return (
        <div>
            <Menu
                items={categories}
                handleClick={item => actions.changeSection(item.section)}
            />
            <div>
                <SectionLoader
                    name={section}
                    state={state}
                    actions={actions}
                    sectionsContent={SECTIONS_CONTENT}
                />
            </div>
        </div>
    );
}

const defaultState = {
    section: SECTION_HOME,
    categories: [
        {
            name: 'Home',
            section: SECTION_HOME,
            url: '#home',
        },
        {
            name: 'Streams',
            section: SECTION_STREAMS,
            url: '#streams',
        },
    ],
    form: {
        firstname: '',
        secondname: '',
        email: '',
    },
};

const actions = {
    changeSection: section => state => {
        return {
            ...state,
            section,
        };
    },

    addSection: () => state => {
        const name = `Section${Math.random()}`;
        return {
            ...state,
            categories: [
                ...state.categories,
                {
                    name,
                    section: null,
                    url: '#' + name,
                },
            ],
        };
    },

    changeFormField: ({ name, value }) => state => {
        return {
            ...state,
            form: {
                ...state.form,
                [name]: value,
            }
        };
    },

    submitForm: () => state => {
        console.log('form submit', state.form);
        return state;
    },
};

logger({})(app)(defaultState, actions, view, document.body);
