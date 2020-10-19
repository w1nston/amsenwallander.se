/** @jsx jsx */
import { useMachine } from '@xstate/react';
import { css, jsx } from '@emotion/core';
import {
  createKitchenTimerMachine,
  KitchenTimerContext,
  KitchenTimerEvent,
} from './kitchenTimerMachine';

type Props = {
  duration: number;
};

const containerStyles = css`
  display: flex;
  flex-direction: column;
  max-width: 16rem;
`;

const buttonSectionStyles = css`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const actionButtonSectionStyles = css`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin: 1rem 0;
`;

const startPauseButtonStyles = css`
  color: #fefdfa;
  background-color: #47b5ff;
  cursor: pointer;
  text-transform: uppercase;
  -webkit-text-decoration: none;
  text-decoration: none;
  box-shadow: 6px 8px 8px -8px #4d4a48;
  border: none;
  height: 3rem;
  width: 9rem;

  &:disabled {
    opacity: 0.5;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

const timerStyles = css`
  font-size: 3rem;
  margin: 0 auto;
`;

const timerContainerStyles = css`
  display: flex;
  padding: 3rem 0;
`;

const durationButtonStyles = css`
  color: #fefdfa;
  cursor: pointer;
  -webkit-text-decoration: none;
  text-decoration: none;
  border: none;
  box-shadow: 6px 8px 8px -8px #4d4a48;
  background-color: #ff7961;
  height: 3rem;
  width: 4.5rem;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

// TODO: really need to make reusable simple components for buttons at least...
const resetButtonStyles = css`
  color: #fefdfa;
  background-color: #aa9e9c;
  cursor: pointer;
  text-transform: uppercase;
  -webkit-text-decoration: none;
  text-decoration: none;
  box-shadow: 6px 8px 8px -8px #4d4a48;
  border: none;
  height: 3rem;
  width: 4.5rem;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;

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

export default function KitchenTimer({ duration }: Props) {
  const kitchenTimerMachine = createKitchenTimerMachine(duration);
  const [current, send] = useMachine<KitchenTimerContext, KitchenTimerEvent>(
    // @ts-ignore
    kitchenTimerMachine
  );

  const currentTime = current.context.duration - current.context.elapsed;

  const seconds = getSeconds(currentTime);
  const minutes = getMinutes(currentTime);
  const hours = getHours(currentTime);

  return (
    <div css={containerStyles}>
      <div css={buttonSectionStyles}>
        <button
          css={durationButtonStyles}
          onClick={() => send({ type: 'UPDATE.DURATION', value: ONE_HOUR })}
        >
          +1 timma
        </button>
        <button
          css={durationButtonStyles}
          onClick={() => send({ type: 'UPDATE.DURATION', value: ONE_MINUTE })}
        >
          +1 minut
        </button>
        <button
          css={durationButtonStyles}
          onClick={() => send({ type: 'UPDATE.DURATION', value: ONE_SECOND })}
        >
          +1 sekund
        </button>
      </div>

      <div css={timerContainerStyles}>
        <time css={timerStyles} dateTime={`${hours}:${minutes}:${seconds}`}>
          {hours}:{minutes}:{seconds}
        </time>
      </div>

      <div css={buttonSectionStyles}>
        <button
          css={durationButtonStyles}
          onClick={() => send({ type: 'UPDATE.DURATION', value: -ONE_HOUR })}
        >
          -1 timma
        </button>
        <button
          css={durationButtonStyles}
          onClick={() => send({ type: 'UPDATE.DURATION', value: -ONE_MINUTE })}
        >
          -1 minut
        </button>
        <button
          css={durationButtonStyles}
          onClick={() => send({ type: 'UPDATE.DURATION', value: -ONE_SECOND })}
        >
          -1 sekund
        </button>
      </div>

      <div css={actionButtonSectionStyles}>
        {current.value === 'paused' ? (
          <button
            disabled={current.context.duration === 0}
            css={startPauseButtonStyles}
            onClick={() => send('START')}
          >
            Starta
          </button>
        ) : (
          <button
            disabled={current.value === 'done'}
            css={startPauseButtonStyles}
            onClick={() => send('PAUSE')}
          >
            Pausa
          </button>
        )}
        <button
          css={resetButtonStyles}
          onClick={() => send({ type: 'RESET', duration: 0 })}
        >
          Nollställ
        </button>
      </div>
    </div>
  );
}
