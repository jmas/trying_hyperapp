import { h, app } from 'hyperapp';

export default function SectionLoader({
    name,
    state={},
    actions={},
    sectionsContent={},
}) {
    const load = (element, name) => {
        console.log('load', name);
        if (!sectionsContent[name]) {
            console.warn(`Section with name '${name}' is not defined.`);
            return;
        }
        sectionsContent[name]().then(section => {
            const { view } = section['default'];
            app(state, actions, view, element);
        });
    };
    const onUpdate = (element, oldProps) => {
        if (oldProps.name !== name) {
            load(element, name);
        }
    };
    const onCreate = element => {
        load(element, name);
    };
    return (
        <div oncreate={onCreate} onupdate={onUpdate}></div>
    );
}
