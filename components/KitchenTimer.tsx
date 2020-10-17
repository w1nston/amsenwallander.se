import { assign, Machine, StateMachine } from 'xstate';
import { useMachine } from '@xstate/react';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const TEN_MINUTES = 10 * ONE_MINUTE;

interface KitchenTimerContext {
  elapsed: number;
  duration: number;
}

interface KitchenTimerStateSchema {
  states: {
    idle: {};
    running: {};
    paused: {};
    done: {};
  };
}

type TickEvent = { type: 'TICK' };
// Note, it's possible to add a payload to an event,
// e.g. Add[Second/Minute]Event could be made more generic
type AddSecondEvent = { type: 'ADD.SECOND' };
type AddMinuteEvent = { type: 'ADD.MINUTE' };
type ResetEvent = { type: 'RESET'; duration: number }; // TODO: is duration needed?
type StartEvent = { type: 'START' };
type KitchenTimerEvent =
  | TickEvent
  | AddSecondEvent
  | AddMinuteEvent
  | ResetEvent
  | StartEvent;

// TODO: make a factory function for the machine...

const kitchenTimerMachine = Machine<
  KitchenTimerContext,
  KitchenTimerStateSchema,
  KitchenTimerEvent
>(
  {
    id: 'KitchenTimer',
    initial: 'idle',
    context: {
      elapsed: 0,
      duration: 3000,
    },
    states: {
      idle: {
        on: {
          START: {
            target: 'running',
          },
        },
      },
      running: {
        invoke: {
          /**
           * So... this is all nice and well, but ehm...
           * how do I get the actual value of the timer??
           */
          id: 'clockTick',
          src: function outer(context, event) {
            return function inner(callback) {
              const id = setInterval(() => callback('TICK'), 1000);
              return function cleanup() {
                clearInterval(id);
              };
            };
          },
        },
        on: {
          '': {
            target: 'done',
            cond: 'isTimeUp',
          },
          TICK: {
            actions: 'countDown',
          },
          // @ts-ignore
          PAUSE: {
            target: 'paused',
          },
        },
      },
      paused: {
        on: {
          START: {
            target: 'running',
          },
          RESET: {
            target: 'idle',
            actions: 'resetTimer',
          },
        },
      },
      done: {
        on: {
          RESET: {
            target: 'idle',
            actions: 'resetTimer',
          },
        },
      },
    },
    on: {
      'ADD.SECOND': {
        actions: 'addSecond',
      },
      'ADD.MINUTE': {
        actions: 'addMinute',
      },
    },
  },
  {
    actions: {
      addSecond: assign<KitchenTimerContext>({
        duration: (context: KitchenTimerContext) =>
          context.duration + ONE_SECOND,
      }),
      addMinute: assign<KitchenTimerContext>({
        duration: (context: KitchenTimerContext) =>
          context.duration + ONE_MINUTE,
      }),
      countDown: assign<KitchenTimerContext>({
        elapsed: (context: KitchenTimerContext) => context.elapsed + ONE_SECOND,
      }),
      resetTimer: assign<KitchenTimerContext, ResetEvent>({
        elapsed: 0,
        duration: (context: KitchenTimerContext, event: ResetEvent) =>
          event.duration,
      }),
    },
    guards: {
      isTimeUp: (context: KitchenTimerContext): boolean =>
        context.elapsed >= context.duration,
    },
  }
);

export default function KitchenTimer(props) {
  // @ts-ignore
  const [current, send] = useMachine(kitchenTimerMachine);

  console.log('current state', current);

  return (
    <div>
      <time>{current.context.duration - current.context.elapsed}</time>
      {current.value === 'idle' || current.value === 'paused' ? (
        <button onClick={() => send('START')}>Start</button>
      ) : null}
      {current.value === 'running' ? (
        <button onClick={() => send('PAUSE')}>Pause</button>
      ) : null}
      {current.value === 'paused' || current.value === 'done' ? (
        // @ts-ignore
        <button onClick={() => send({ type: 'RESET', duration: 3000 })}>
          Reset
        </button>
      ) : null}
    </div>
  );
}
