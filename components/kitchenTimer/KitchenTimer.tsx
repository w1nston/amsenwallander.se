import { useMachine } from '@xstate/react';
import {
  createKitchenTimerMachine,
  KitchenTimerContext,
  KitchenTimerEvent,
} from './kitchenTimerMachine';

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

const TEN_MINUTES = 10 * ONE_MINUTE;

function getSeconds(currentTime: number): string {
  const seconds = currentTime / 1000;
  if (seconds % 60 === 0) {
    return '00';
  }

  if (seconds % 60 < 10) {
    return `0${seconds % 60}`;
  }

  return `${seconds % 60}`;
}

function getMinutes(currentTime: number): string {
  const seconds = currentTime / 1000;
  const minutes = Math.floor(seconds / 60);

  if (minutes % 60 === 0) {
    return `00`;
  }

  if (minutes % 60 < 10) {
    return `0${minutes % 60}`;
  }

  return minutes < 10 ? `0${minutes % 60}` : `${minutes % 60}`;
}

function getHours(currentTime: number): string {
  const seconds = currentTime / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return hours < 10 ? `0${hours}` : `${hours}`;
}

export default function KitchenTimer() {
  // TODO: Props: { duration: number }
  const kitchenTimerMachine = createKitchenTimerMachine(
    9 * ONE_HOUR + 59 * ONE_MINUTE + 59 * ONE_SECOND
  );
  const [current, send] = useMachine<KitchenTimerContext, KitchenTimerEvent>(
    // @ts-ignore
    kitchenTimerMachine
  );

  console.log('[state]', current);

  const currentTime = current.context.duration - current.context.elapsed;

  const seconds = getSeconds(currentTime);
  const minutes = getMinutes(currentTime);
  const hours = getHours(currentTime);

  return (
    <div>
      <button
        onClick={() => send({ type: 'UPDATE.DURATION', value: ONE_HOUR })}
      >
        +1 timma
      </button>
      <button
        onClick={() => send({ type: 'UPDATE.DURATION', value: ONE_MINUTE })}
      >
        +1 minut
      </button>
      <button
        onClick={() => send({ type: 'UPDATE.DURATION', value: ONE_SECOND })}
      >
        +1 sekund
      </button>
      <br />
      <time>
        {hours}:{minutes}:{seconds}
      </time>
      <br />
      <button
        onClick={() => send({ type: 'UPDATE.DURATION', value: -ONE_HOUR })}
      >
        -1 timma
      </button>
      <button
        onClick={() => send({ type: 'UPDATE.DURATION', value: -ONE_MINUTE })}
      >
        -1 minut
      </button>
      <button
        onClick={() => send({ type: 'UPDATE.DURATION', value: -ONE_SECOND })}
      >
        -1 sekund
      </button>
      <br />
      <button
        disabled={current.value === 'running' || current.context.duration === 0}
        onClick={() => send('START')}
      >
        Starta
      </button>
      <button
        disabled={current.value === 'paused'}
        onClick={() => send('PAUSE')}
      >
        Pausa
      </button>
      <button
        disabled={current.context.duration === 0}
        onClick={() => send({ type: 'RESET', duration: 0 })}
      >
        Nollställ
      </button>
      <br />
    </div>
  );
}
