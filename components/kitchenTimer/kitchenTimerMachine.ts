import { assign, Machine } from 'xstate';

export interface KitchenTimerContext {
  elapsed: number;
  duration: number;
}

export interface KitchenTimerStateSchema {
  states: {
    running: {};
    paused: {};
    done: {};
  };
}

type TickEvent = { type: 'TICK' };
type UpdateDurationEvent = { type: 'UPDATE.DURATION'; value: number };
type PauseEvent = { type: 'PAUSE' };
type ResetEvent = { type: 'RESET'; duration: number }; // TODO: is duration needed?
type StartEvent = { type: 'START' };
export type KitchenTimerEvent =
  | TickEvent
  | UpdateDurationEvent
  | PauseEvent
  | ResetEvent
  | StartEvent;

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;

export function createKitchenTimerMachine(duration: number) {
  return Machine<
    KitchenTimerContext,
    KitchenTimerStateSchema,
    KitchenTimerEvent
  >(
    {
      id: 'KitchenTimer',
      initial: 'paused',
      context: {
        elapsed: 0,
        duration,
      },
      states: {
        running: {
          invoke: {
            id: 'clockTick',
            src: 'timer',
          },
          always: {
            target: 'done',
            cond: 'isTimeUp',
          },
          on: {
            TICK: {
              actions: 'countDown',
            },
            PAUSE: {
              target: 'paused',
            },
            RESET: {
              target: 'paused',
              actions: 'resetTimer',
            },
          },
        },
        paused: {
          on: {
            START: {
              target: 'running',
            },
            RESET: {
              actions: 'resetTimer',
            },
          },
        },
        done: {
          /**
           * TODO: Add entry action
           * And investigate if below is possible, and works on brave...
           * https://developer.chrome.com/apps/app_codelab_alarms
           */
          on: {
            RESET: {
              target: 'paused',
              actions: 'resetTimer',
              // TODO: Figure out a way, either to send a message, or maybe don't transition to paused
              // automatically... in this state, it would be nice to flash that the time is up,
              // and perhaps make a sound...
              // Hmm...what happens when browser becomes idle???
              // is it possible to access native clock from browser?
              // or would that be notification?

              // maybe need extension?
            },
          },
        },
      },
      on: {
        'UPDATE.DURATION': {
          actions: 'updateDuration',
        },
      },
    },
    {
      actions: {
        updateDuration: assign<KitchenTimerContext, KitchenTimerEvent>({
          // @ts-ignore
          duration: (
            context: KitchenTimerContext,
            event: UpdateDurationEvent
          ) => {
            const nextDuration = context.duration + event.value;

            if (nextDuration < 0) {
              return 0;
            }

            return nextDuration;
          },
        }),
        countDown: assign<KitchenTimerContext, KitchenTimerEvent>({
          elapsed: (context: KitchenTimerContext) =>
            context.elapsed + ONE_SECOND,
        }),
        resetTimer: assign<KitchenTimerContext, KitchenTimerEvent>({
          elapsed: 0,
          // @ts-ignore
          duration: (context: KitchenTimerContext, event: ResetEvent) =>
            event.duration,
        }),
      },
      guards: {
        isTimeUp: (context: KitchenTimerContext): boolean =>
          context.elapsed >= context.duration,
      },
      services: {
        timer: function outer() {
          return function inner(callback) {
            const id = setInterval(() => callback('TICK'), 1000);
            return function cleanup() {
              clearInterval(id);
            };
          };
        },
      },
    }
  );
}
