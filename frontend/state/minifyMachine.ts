import {assign, fromPromise, setup} from 'xstate';

interface MinifyMachineContextSchema {
    url: Nullable<string>;
    minifiedUrl: Nullable<string>;
    error: Nullable<string>;
}

export const minifyUrlFormMachine = setup({
    types: {
        context: {} as MinifyMachineContextSchema
    },
    actions: {
        setUrl: assign({
            url: ({event}) => event.value
        }),
        setMinifiedUrl: assign({
            minifiedUrl: (ev) => {
                return ev.event.output.url;
            },
            error: ({context}) => context?.url?.length ? "" : "URL cannot be empty"
        }),
        setError: assign({
            error: (ev) => {
                return ev.event.value;
            }
        }),
    },
    actors: {
        minifyUrl: fromPromise(({input}: { input: { url: string } }) => {
            return fetch("/api", {
                method: "POST",
                body: JSON.stringify({url: input?.url || ""}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).catch(err => err);
        })
    }
}).createMachine({
    id: 'minifyUrlForm',
    initial: 'idle',
    context: {
        url: undefined,
        minifiedUrl: undefined,
        error: undefined,
    },
    states: {
        idle: {
            on: {
                MINIFY: 'minifying',
                CHANGE: {
                    actions: ['setUrl']
                }
            },
        },
        minifying: {
            invoke: {
                src: 'minifyUrl',
                input: ({context}) => ({url: context?.url ?? ""}),
                onDone: {
                    target: 'idle',
                    actions: ['setMinifiedUrl'],
                },
                onError: {
                    target: 'idle',
                    actions: ['setError']
                }
            },
        },
    }
});