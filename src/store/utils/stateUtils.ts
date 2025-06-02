import { Draft, PayloadAction } from '@reduxjs/toolkit';

import { BaseState } from '../types';

export const setPending = <T extends BaseState>(state: Draft<T>) => {
  state.loading = true;
  state.error = null;
};

export const setFulfilled = <T extends BaseState>(state: Draft<T>) => {
  state.loading = false;
  state.error = null;
};

export const setRejected = <T extends BaseState>(
  state: Draft<T>,
  action: PayloadAction<string | undefined>
) => {
  state.loading = false;
  state.error = action.payload || 'An error occurred';
};
