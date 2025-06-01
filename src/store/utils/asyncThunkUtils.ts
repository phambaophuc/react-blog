import { ApiError } from '@/services/base';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAppAsyncThunk = <TReturned, TArg = void>(
  typePrefix: string,
  payloadCreator: (arg: TArg) => Promise<TReturned>
) => {
  return createAsyncThunk<TReturned, TArg, { rejectValue: string }>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await payloadCreator(arg);
      } catch (error) {
        if (error instanceof ApiError) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('An unexpected error occurred');
      }
    }
  );
};
